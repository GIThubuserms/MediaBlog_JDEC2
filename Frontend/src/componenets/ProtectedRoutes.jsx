import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuthcontext } from '../context/Authcontext.jsx';

function ProtectedRoutes() {
    const user=localStorage.getItem('user')
    return user?<Outlet/>:<Navigate to={'/login'}/>

}

export default ProtectedRoutes
