import {v2 as cloudinary} from 'cloudinary'
import { asynchandler } from './Asynchandler.js'
import fs from 'fs'

cloudinary.config({
    cloud_name:'dsnne18o3',
    api_key:154578853975938,
    api_secret:'rOQgeA30XPKFsIPUQBFLwB_23yo',
})

export const cloudinaryupload=async(url)=>{
   try {
    const uploadedfile=await cloudinary.uploader.upload(url,{resource_type:'auto',transformation:{height:400,width:300}})
    if(!uploadedfile){
        throw new Error("Error while uploading file to cloudinary")        
    }
    console.log(uploadedfile.url);
    
    fs.unlinkSync(url)
    return uploadedfile.url
    
   } catch (error) {
    fs.unlinkSync(url)
    throw new Error(error.message)
   }
}