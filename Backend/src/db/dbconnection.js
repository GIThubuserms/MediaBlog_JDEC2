import { asynchandler } from "../utils/Asynchandler.js";
import mongoose from 'mongoose' 


export const dbconnection=asynchandler(async()=>{
    try {
        const instance= await mongoose.connect(`${process.env.MONGO_DB_URL}${process.env.DB_NAME}`)
        if(instance){
            console.log("DB CONNECTED ");
        }
    } catch (error) {
        console.log(error);
    }
})