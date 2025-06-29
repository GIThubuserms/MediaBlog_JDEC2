import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Upload from './componenets/Upload.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './componenets/ProtectedRoutes.jsx'
import {ToastContainer} from 'react-toastify'
import { Authprovider } from './context/Authcontext.jsx'
import {  Postprovider } from './context/PostContext.jsx'
import { Likeprovider } from './context/LikeContext.jsx'

const user=localStorage.getItem('user')



const router=createBrowserRouter(
  createRoutesFromElements(
  <>
  <Route element={<ProtectedRoutes/>}>
  <Route path='/' element={<App/>}></Route>  
  <Route path='/upload' element={<Upload/>}></Route>  
  </Route>
  <Route path='/login' element={<Login/>}></Route>  
  <Route path='/signup' element={<Signup/>}></Route>  
  </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
   <Authprovider>
      <Postprovider>
        <Likeprovider>
        <RouterProvider router={router} />
        <ToastContainer />
        </Likeprovider>
      </Postprovider>
    </Authprovider>

</>
)
