// const express=require('express');
// const bodyParser=require('body-parser'); 
const {Server, Socket}=require('socket.io');
const io=new Server(8000,{
    cors:true,
})
io.on("connection",(Socket)=>{
    console.log(`socket connected`,Socket.id)
})
// const app=express();

// app.get('/',(req,res)=>{
//     res.send("hello guys!!")
// })

// app.listen(8000,()=>{
//     console.log("port 8000 is started");
// })