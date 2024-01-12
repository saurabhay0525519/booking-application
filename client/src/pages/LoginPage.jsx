import { useContext, useState } from "react";
import {Link, Navigate} from "react-router-dom"
import axios from "axios";
import { UserContext } from "../Usercontext.jsx";
// import React from "react";
export default function LoginPage(){
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[redirect,setRedirect] = useState(false);
    const{setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            // console.log('before login');
            const {data} =   await  axios.post('/login',{email,password});
            console.log(data);
            // console.log(userInfo);
            // const setUser = userInfo;
            // console.log(userInfo.data);
            setUser(data);
            // console.log('loginpage user',user);

            // console.log('the value of setUser',setUser);
            alert('login succesfully');
            setRedirect(true);
        }catch(e){
            alert('login failed check username and password');
        }
    };

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
    <div className="mt-4 grow flex items-center justify-around ">
      <div className="mb-64">
            <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto flex flex-col" onSubmit={handleLoginSubmit} >
                
                <input className="border border-blue-300 p-2 rounded-full my-2 "
                    type="email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                    placeholder="your@email.com" 
                 />
                <input className="border border-blue-300 p-2 rounded-full my-2 "
                     type="password"
                     value={password}
                     onChange={ev => setPassword(ev.target.value)}
                     placeholder="password"
                     />
                <button  className="primary rounded-full p-2 my-2">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className="underline text-black" to={'/register'}>register</Link>
                </div>
            </form>
      </div>
    </div>
    );
}