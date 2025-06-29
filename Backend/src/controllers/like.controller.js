import { asynchandler } from "../utils/Asynchandler.js";
import { User } from "../models/user.model.js";
import { Like } from "../models/like.model.js";
import mongoose from "mongoose";

export const DoLike = asynchandler(async (req, res) => {
  let likeby = req.user._id;
  let {postid} = req.params;

postid= new mongoose.Types.ObjectId(postid)


  const haveuserliked = await Like.findOne({
    LikedBy: likeby,
    PostId: postid,
  });
  
  if (haveuserliked) {
    const unlike = await Like.deleteOne({_id:haveuserliked._id});
    if (unlike){
      return res.status(200).json({ message: "Unlike successfully" });
    }
    return res.status(400).json({ message: "Error while unliking a Like" });

  }
  if (!haveuserliked) {
    const dolike = await Like.create({
      LikedBy: likeby,
      PostId: postid,
    });
    if (dolike) {
      return res.status(200).json({ message: "Like successfull" });
    }
    return res.status(400).json({ message: "Error while creating a Like" });
  }
});

export const totalpostlikes = asynchandler(async (req, res) => {

    let {postid} = req.params;

    const totlikes=await Like.aggregate([
        {
            $match:{
                "PostId":new mongoose.Types.ObjectId(postid)
            }
        },
        {
            $count:"Totallikes"
        }
    ])
    
    return res.status(200).json({message:totlikes[0]})
});
