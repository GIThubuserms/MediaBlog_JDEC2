import { Router } from "express";
import {DoLike,totalpostlikes} from '../controllers/like.controller.js'
import { verifyuser } from "../middlewares/verifyuser.js";


export const likerouter=new Router()

likerouter.route('/like/:postid').post(verifyuser,DoLike)
likerouter.route('/totallikes/:postid').post(verifyuser,totalpostlikes)
