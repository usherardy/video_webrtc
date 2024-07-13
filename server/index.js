const express = require('express');
const bodyparser = require('body-parser');
const {Server}= require ("socket.io");
//using socket.io for the signalling server

const io = new Server();
const app = express();

app.use(express.json())
//app.use(cors());

io.on('connection', (socket) => {
    socket.on('join-room', (data) => {
        const {roomId, emailId} = data;
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-joined", {emailId});
    });
});

app.listen(3000, () => {
    console.log("Server running on Port 3000")
});

io.listen(3001);


