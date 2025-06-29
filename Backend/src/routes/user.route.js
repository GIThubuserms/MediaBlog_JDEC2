import { Router } from "express";
import {login,logout,signup} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.js'

export const userrouter=new Router()

userrouter.route('/login').post(login)
userrouter.route('/logout').post(logout)
userrouter.route('/signup').post(upload.single('avatar'),signup)