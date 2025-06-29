import { Router } from "express";
import {createPost,getposts} from '../controllers/post.controller.js'
import {upload} from '../middlewares/multer.js'
import {verifyuser} from '../middlewares/verifyuser.js'

export const postrouter=new Router()

postrouter.route('/upload').post(upload.single('pic'),verifyuser,createPost)
postrouter.route('/getpost').post(verifyuser,getposts)
