import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuthcontext } from '../../../context/Authcontext.jsx'
import Loading from '../../Loading.jsx'


function Bottomleft() {
    const navigate=useNavigate()
    const {logout,loading}=useAuthcontext()
     
    const user=JSON.parse(localStorage.getItem('user'))
    console.log(user);
    
    const handellogout=async()=>{
     const res=await logout()
     if(res){
        navigate('/login')
    }
    }

    return (
        <div className='flex space-x-4 justify-center items-center   '>
            <div className="avatar flex flex-col gap-y-4 ">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ">
                    <img src={user?.avatar} />
                </div>
                <p className='text-sm font-semibold '>{user?.username}</p>

            </div>
            <div className='' >
                <button onClick={handellogout}  className="btn btn-active">Logout</button>
            </div>
            {loading&&<Loading/>}
        </div>
    )
}

export default Bottomleft
