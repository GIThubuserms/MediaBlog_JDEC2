import { createContext, useContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Authcontext=createContext()

export const Authprovider=({children})=>{
const [user,setuser]=useState(null)
const [loading,setisloading]=useState(false)

 async function login(data){
   try {
    setisloading(true)
     const response=await axios.post('https://mediaweb.onrender.com/api/v1/user/login',data,{withCredentials:true})
     if(response){        
      console.log(response?.data?.message);
      setuser(response?.data?.message)
      const user=response.data.message
      
      localStorage.setItem('user',JSON.stringify(user))
      setisloading(false)
      toast.success("User Login successfully")
     }
     return true; 
   } catch (error) {
    if(error?.response?.data.message){
    toast.error(error.response.data.message)
    setisloading(false)

   }
   
}
 }

 async function logout(data){
   try {
     setisloading(true)
     const response=await axios.post('https://mediaweb.onrender.com/api/v1/user/logout',{},{withCredentials:true})
     if(response){        
      console.log(response?.data?.message);
      setuser(null)
      localStorage.removeItem('user')
      setisloading(false)
      toast.success("User Logout successfully")
     }
     return true; 
   } catch (error) {
    if(error?.response?.data.message){
    toast.error(error.response.data.message)
    setisloading(false)

   }
   
}
 }

 async function signup(data){
   try {
    setisloading(true)

    const form=new FormData()
      form.append("username",data.username),
      form.append("email",data.email),
      form.append("password",data.password),
      form.append("avatar",data.avatar)
     const response=await axios.post('https://mediaweb.onrender.com/api/v1/user/signup',form,{headers:{"Content-Type": "multipart/form-data",}})
     if(response){        
      console.log(response?.data?.message);
      setisloading(false)
      toast.success("User Created successfully")
     }
     return true; 
   } catch (error) {
    if(error?.response?.data.message){
    toast.error(error.response.data.message)
    setisloading(false)
   }
}
 }

 return <Authcontext.Provider value={{user,loading,login,logout,signup}}>
 {children}
 </Authcontext.Provider>
}

export const useAuthcontext=()=>{
    return useContext(Authcontext)
}