const express = require('express');
const bodyparser = require('body-parser');
const {Server}= require ("socket.io");
//using socket.io for the signalling server

const io = new Server({
    cors: true,
});

const app = express();

app.use(express.json())
//app.use(cors());
const emailMap =  new Map();

io.on('connection', (socket) => {
    console.log("New connection");
    socket.on('join-room', (data) => {
        const {roomId, emailId} = data;
        //mapping socketid to room
        console.log("User", emailId, "Joined Room", roomId);
        emailMap.set(emailId, socket.id);
        socket.join(roomId);
        //emiiting the event for joining rrom
        socket.emit("room-joined", {roomId});
        socket.broadcast.to(roomId).emit("user-joined", {emailId});
    });
});

app.listen(3000, () => {
    console.log("Server running on Port 3000")
});

io.listen(3001);


