import { useContext } from "react";
import { UserContext } from "../Usercontext";
import { Navigate } from "react-router-dom";

export default function AccountPage(){
    const{user,ready} = useContext(UserContext);
    // console.log('acc.page user ',user);
    // console.log(`the account ${ready}`);
    if(!ready){
        return 'loading...';
    }
    if(ready && !user){
        return <Navigate to={'/login'}  />
    }
    return(
        <div> account page {user.name} </div>
    );
};