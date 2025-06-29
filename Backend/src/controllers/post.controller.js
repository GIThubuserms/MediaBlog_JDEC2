import {asynchandler} from '../utils/Asynchandler.js'
import {User} from '../models/user.model.js'
import {Post} from '../models/post.model.js'
import { cloudinaryupload } from '../utils/Cloudinary.js'
import { log } from 'console'


export const createPost = asynchandler(async (req, res) => {
    const { discription } = req.body;
    const pic = req.file;
    const user = req.user;

    if (!(discription || pic)) {
        throw new Error("Description and Post are required fields");
    }

    // Upload to Cloudinary
    const cloudinaryUpload = await cloudinaryupload(pic.path);
    if (!cloudinaryUpload) {
        throw new Error("Post Not uploading");
    }
    console.log(user);

    // Create a new post
    const newpost = await Post.create({
        discription: discription,
        pic: cloudinaryUpload,
        owner: user._id,
    });

    if (!newpost) {
        throw new Error("Description and Post are required fields");
    }

    // Fetch owner details
    const ownerDetails = await User.findById(newpost.owner).select('username avatar email createdAt');

    const ownerandpost = {
        _id: newpost._id,
        discription: newpost.discription,
        pic: newpost.pic,
        createdAt: newpost.createdAt,
        updatedAt: newpost.updatedAt,
        owner: [
            {
                _id: ownerDetails._id,
                username: ownerDetails.username,
                avatar: ownerDetails.avatar,
                email: ownerDetails.email,
                createdAt: ownerDetails.createdAt,
                updatedAt: ownerDetails.updatedAt,
            }
        ],
    };

    console.log(ownerandpost);

    return res.status(200).json({ message: ownerandpost });
});



export const getposts=asynchandler(async(req,res)=>{
    let {pageNum,postsperpage}=req.query
    postsperpage=Number(postsperpage) || 5
    const startindex=postsperpage*(pageNum-1) || 1
    const endindex=postsperpage*pageNum 

    const postperquery=await Post.aggregate([
        {
            $lookup:{
            from:"users",
            localField:"owner",
            foreignField:"_id",
            as:"owner",
            pipeline:[
                {
                    $addFields: {
                        owner: { $arrayElemAt: ["$owner", 0] }, // Get the first owner (if exists)
                    },
                }
            ]
        }
        },
        {
            $skip:startindex
        },
        {
            $limit:postsperpage
        }
    ])

    console.log(postperquery);
    if(postperquery.length<0||!postperquery){
     throw new Error("Post Not fetching")
    }
    return res.status(200).json({message:postperquery})
})