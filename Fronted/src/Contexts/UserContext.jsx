import { createContext,useState,useEffect, useRef } from "react";
import { baseApi } from "../utils/baseApi";

import {io}from 'socket.io-client';

 const AuthContext = createContext();

export const AuthProvider = ({children})=>{
      const saved = JSON.parse(localStorage.getItem('user')) || {id:null,name:null,deleteAt:null,token:null}

 
    
    const public_socket_Ref = useRef(null);
    const[user,setUser] = useState({id:saved.id ,name:saved.name,deleteAt:saved.deleteAt,token:saved.token});

    useEffect(()=>{
                public_socket_Ref.current = io(baseApi,{transports: ["websocket", "polling"]});
                console.log(user,'user',user.name);        
        return ()=> {
             if (public_socket_Ref.current) public_socket_Ref.current.disconnect();
        }
    },[])


    

    useEffect(() => {
  if (
    user &&
    typeof user === "object" &&
    user.id &&
    user.name &&
    user.token &&
    user.token.length > 0
  ) {
  
    localStorage.setItem("user", JSON.stringify(user));
  }
}, [user]);



    const LoginOrRegister = (user)=>{
        if(!user || !user.name || !user.name.trim()|| !user.token) return
        setUser(user)
    };
    
    const logout_user= async()=>{
        localStorage.clear();
        setUser({id:null,name:null,deleteAt:null,token:null});


    }


    return(<AuthContext.Provider value={{logout_user,LoginOrRegister,user,setUser,public_socket_Ref}}>
       {children}
    </AuthContext.Provider>)
}

export default AuthContext