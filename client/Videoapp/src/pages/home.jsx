import React, {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/Socket";
const Home = () => {
    //
    const {socket} = useSocket();
    //socket.emit("join-room", {roomId :"1", emailId: "ex@ex.com"});
    const [email, setEmail] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();
    
    const roomJoined = useCallback(({roomId}) => {
     navigate(`/room/${roomId}`);
    }, [navigate]);

    useEffect( () => {
        //creating a listener for room joined
        socket.on('room-joined', roomJoined)
        return () =>
        {
            socket.off('room-joined', roomJoined);
        }
    }, [roomJoined, socket])
    
    const handleJoinRoom = () => {
        socket.emit("join-room", {emailId: email, roomId});

    }
    return (
        <div className = "container">
            <div className ="input-container">
                <input value ={email} onChange = {e => setEmail(e.target.value)} type ="email" placeholder ="Enter email"/><br/>
                <input value ={roomId} onChange ={e => setRoomId(e.target.value)} type ="text" placeholder ="Enter room code"/><br/>
                <button onClick = {handleJoinRoom}>Enter Room</button>
            </div>
        </div>
    )

}

export default Home;