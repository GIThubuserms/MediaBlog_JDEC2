import React, { useState } from 'react'
import chatty from '../assets/images.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthcontext } from '../context/Authcontext.jsx'
import Loading from '../componenets/Loading.jsx'



function Login() {
  
  const {login,loading}=useAuthcontext()
  const navigate=useNavigate()

  const handlesubmit=async(e)=>{
  e.preventDefault()
  const form=new FormData(e.target)
  const data=Object.fromEntries(form.entries())
  const res=await login(data)
  if(res){
    navigate('/')  
  }
  }   

  return (
    
    <div className='flex justify-center items-center w-full h-screen'>
          {loading&&<Loading/>}

      <form onSubmit={handlesubmit}  className={`${loading&&"hidden"} w-[300px] mx-auto space-y-3 `}>
        <div className='flex items-center space-x-2'>
        <p className='text-2xl text-blue-500'>Welcome To</p>
       <img src={chatty} alt="" className ='w-[80px] h-[80px] rounded-[100%]'  />
        </div>
       
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name='email'  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com"  />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>


        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"  />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        
        <div>   
               <p  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Donot have a account ? <span className='font-bold text-blue-500'><Link to={'/signup'}>Regsiter</Link></span></p>
      </div>
      </form>
     

    </div>
  )
}

export default Login

