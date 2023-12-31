const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server  = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://vibe-chat-mu.vercel.app"],
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
    console.log("User Connected: ",socket.id);

    socket.on("join_room", (data)=>{
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (message)=>{
      console.log(message);
      socket.to(message.room).emit("receive_message", message);
    })

    socket.on("disconnect", ()=>{
      console.log("User disconnected", socket.id);
    })
})

server.listen(3001, ()=>{
  console.log("SERVER RUNNING");
});