import { asynchandler } from "../utils/Asynchandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { cloudinaryupload } from "../utils/Cloudinary.js";
import { log } from "console";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { Domain } from "domain";
dotenv.config();


// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

export const login = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    throw new Error("All fields are required");
  }

  const isuseralreadyexists = await User.findOne({ email });
  if (!isuseralreadyexists) {
    throw new Error("User Doesnot exists ");
  }

  const ispasscorrect = await isuseralreadyexists.verifypassword(password);
  if (!ispasscorrect) {
    throw new Error("Incorrect Password");
  }

  const refreshtoken = isuseralreadyexists.generaterefreshToken();
  if (!refreshtoken) {
    throw new Error("Error while generating token");
  }

  // const mailoptios = {
  //   from: process.env.EMAIL,
  //   to:email,
  //   subject: "Welcome To Chatty",
  //   text: `Welcome To Chatty ${email}`,
  //   html: "<b>Welcome, I hope that you enjoyed our service :) </b>",
  // };
  // transport.sendMail(mailoptios, (error, info) => {
  //   if (error) {
  //       console.error('Email sending failed:', error);
  //   }
  //   console.log("Email sent: " + info);
  // });
 
  let NODE_ENV="production"

  return res
    .status(200)
    .cookie("jwt", refreshtoken,{
      httpOnly:true,
      secure:NODE_ENV === 'production',     
       sameSite:'None',
    })
    .json({ message: isuseralreadyexists });
});

export const signup = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;
  const avatar = req.file;
  console.log(avatar);

  if (!(username || email || password || avatar)) {
    throw new Error("All fields are required");
  }

  const isuseralreadyexists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (isuseralreadyexists) {
    throw new Error("User already exists");
  }

  const avatarurl = await cloudinaryupload(avatar.path);

  if (!avatarurl) {
    throw new Error("File uploading fail");
  }

  const newuser = await User.create({
    username: username,
    email: email,
    password: password,
    avatar: avatarurl,
  });

  if (!newuser) {
    throw new Error("User creation fail");
  }
  return res.status(200).json({ message: newuser });
});

export const logout = asynchandler(async (req, res) => {

  res.clearCookie("jwt");
  return res.status(200).json({ message: "User logout succesfully" });
});
