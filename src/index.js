import express from "express";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app,server } from "./lib/socket.js";
dotenv.config();

const PORT=process.env.PORT;

const allowedOrigins = [
  "http://localhost:5173",
  "https://vibe-backend-5bmf.onrender.com"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, 
}));


app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("chat app is running")
})
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
server.listen(PORT,()=>{
    console.log("server is running on port ",PORT);
   connectDB();
})