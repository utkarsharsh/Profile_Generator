import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
 export const connectDB=async()=>{
    console.log("try one");
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
        })
        console.log('MongoDB connected')
    } catch (err) {
        console.log('Error:',err.message);
    }
}