import { useContext } from "react";
import { UserContext } from "../Usercontext";
import { Navigate ,Link, useParams} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PlacesPage from "./PlacesPage";


export default function AccountPage(){
    const[redirect,setRedirect] = useState(null);
    const{user,ready,setUser} = useContext(UserContext);
    // console.log('acc.page user ',user);
    // console.log(`the ready ${ready}`);
    let{subpage} = useParams();
    console.log(subpage);
    if(subpage === undefined){
        subpage = 'profile';
    }
    // console.log(subpage);
    async function logout(){
       await axios.post('/logout');
       setRedirect('/');
       setUser(null);
    }

    if(!ready){
        return 'loading...';
    }
    if(redirect){
       return <Navigate to={redirect} />
    }

    //not working properly
    // function linkClasses(type = null){
    //     let classes = 'py-2 px-6';
    //     if(type === subpage || subpage === undefined )
    //     classes+='bg-gray-200 text-black rounded-full';
    //     return classes;
    // }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'}  />
    };
    return(
        <div>
            <nav className="w-full mt-2 flex justify-center gap-2 " >
                <Link className='py-2 px-6 bg-gray-200 text-black rounded-full' to={'/account/profile'}  >My profile</Link>
                <Link className="py-2 px-6 bg-gray-200 text-black rounded-full" to={'/account/booking'}  >My booking</Link>
                <Link className="py-2 px-6 bg-gray-200 text-black rounded-full" to={'/account/places'}  >My accommodation</Link>
            </nav>
            {
                subpage === 'profile' && (<div className="text-center mt-4" >the logged user is {user.name} and {user.email} <br/>
                <button className=" bg-red-500 rounded-full m-2 p-2 w-32" onClick={logout} >logout</button>
             </div>)
            }
            {
                subpage === 'places' && (<PlacesPage/>
               
            )}
                
            
        </div>
    );
};