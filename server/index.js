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
const socketEmailmap = new Map();

io.on('connection', (socket) => {
    console.log("New connection");
    socket.on('join-room', (data) => {
        const {roomId, emailId} = data;
        //mapping socketid to room
        console.log("User", emailId, "Joined Room", roomId);
        emailMap.set(emailId, socket.id);
        socketEmailmap.set(socket.id, emailId);
        socket.join(roomId);
        //emiiting the event for joining rrom
        socket.emit("room-joined", {roomId});
        socket.broadcast.to(roomId).emit("user-joined", {emailId});
    });
    //sendind and offer with emailiD and socket
    socket.on('handshake',(data) => {
        const {emailId, offer} = data;
        const socketId = emailMap.get(emailId);
        const email = socketEmailmap.get(socket.id);
        
        socket.to(socketId).emit("incomming-call", {from :email, offer})
    })
});

app.listen(3000, () => {
    console.log("Server running on Port 3000")
});

io.listen(3001);


