import { asynchandler } from "../utils/Asynchandler.js";
import jwt from 'jsonwebtoken'

export const verifyuser=asynchandler(async(req,_,next)=>{
    
    try {
      const token=req?.cookies?.jwt || req?.header('Authentication')?.replace('Bearer ','')      
      console.log(token);
      
      if(!token){
          throw new Error("User is not verified")
      }
      
      const isverify=jwt.verify(token,process.env.REF_TOKEN);
  
      if(!isverify){
          throw new Error("User token Not matched")
      }    
      req.user=isverify    
     next()
    } catch (error) {
      console.log(error);
      throw new Error(error)
    
    }
})