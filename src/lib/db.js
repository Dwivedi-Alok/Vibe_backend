import mongoose from "mongoose";
export const connectDB=async()=>{
 try{
     const conn=await mongoose.connect(process.env.MONGO_URI)
     console.log(`mongoose connected successfully : ${conn.connection.host}`)
 }
 catch(err){
     console.log("error:" ,err);
 }
};
