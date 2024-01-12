import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const[user,setUser] = useState(null);//useState hook
    const[ready,setReady] = useState(false);
    console.log(`the line 9 user ${user}`);
    console.log(`the line 10 ready ${ready}`);
    useEffect(() => {
        if(!user){
            const {data} = axios.get('/profile');
            // console.log(data); both will give same output
            // console.log({data});
            setUser(data);
            console.log(`the line 17 user ${user}`);
            console.log('the line 18 after  reconciliation');
            setReady(true);
            console.log(`the line 20 ready ${ready}`);
            console.log('context user in useffect',user);
        }
    },[]);
    console.log('run before return');
    return(
        <UserContext.Provider value={{user,setUser,ready}} >
            {children}
        </UserContext.Provider>
    );
    //below line of code not run because return() runs as last, after this no line of code run
    //console.log('run after return');
};