import { useState } from "react";
import React  from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
export default function LoginPage(){
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    async function registerUser(ev){
        ev.preventDefault();
        try{
            //axios.post('/register') <'http://localhost:5000/register'>
            await axios.post('/register',{
                name,
                email,
                password,
            });
            alert("succesfully registered")
        }catch{
            alert("sorry click to register again");
        }
    };
    return (
    <div className="mt-4 grow flex items-center justify-around ">
      <div className="mb-64">
            <h1 className="text-3xl font-bold text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto flex flex-col" onSubmit={registerUser} >
                <input className="border border-blue-300 p-2 rounded-full my-2 " 
                    type='text' 
                    placeholder="saurabhy"
                    value = {name}
                    onChange = {ev => setName(ev.target.value)}
                />
                <input className="border border-blue-300 p-2 rounded-full my-2 " 
                    type="email"
                    placeholder="your@email.com" 
                    value = {email}
                    onChange = {ev => setEmail(ev.target.value)}
                />
                <input className="border border-blue-300 p-2 rounded-full my-2 "
                    type="password"
                    placeholder="password"
                    value = {password}
                    onChange = {ev => setPassword(ev.target.value)}
                 />
                <button  className="primary rounded-full p-2 my-2">Register</button>
                <div className="text-center py-2 text-gray-500">
                    Already a member? <Link className="underline text-black" to={'/login'}>login</Link>
                </div>
            </form>
      </div>
    </div>
    );
}