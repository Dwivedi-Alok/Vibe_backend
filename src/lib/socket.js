import {Server} from "socket.io";
import http from "http";
import express from "express";
const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173","https://vibe-frontend-umber.vercel.app"],
    
    },

});
export function getReceiverSocketId(userId){
    return userSockeMap[userId];
}
//used to store online users
const userSockeMap={};// {userId:socketId}
io.on("connection",(socket)=>{
    console.log("user connected",socket.id);
    const userId=socket.handshake.query.userId;
    // userSockeMap[userId]=socket.id;
    if(userId) userSockeMap[userId]=socket.id;
    io.emit("getOnlineUsers",Object.keys(userSockeMap));

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id);
        delete userSockeMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSockeMap));
    })
})



export {io,app,server};