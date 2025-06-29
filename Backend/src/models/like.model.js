import mongoose, { Schema } from "mongoose";


const LikeSchema=new Schema({
    PostId:{
     type:Schema.Types.ObjectId,
     ref:'Post'
    },
    LikedBy:{
     type:Schema.Types.ObjectId,
     ref:'User'
    }
},{timestamps:true})


export const Like=mongoose.model('Like',LikeSchema)

