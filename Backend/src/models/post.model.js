import mongoose, { Schema } from "mongoose";


const PostSchema=new Schema({
    discription:{
     type:String,
     required:true
    },
    owner:{
     type:Schema.Types.ObjectId,
     ref:'User'
    },
    pic:{
    type:String,
    required:true
    }
},{timestamps:true})


export const Post=mongoose.model('Post',PostSchema)

