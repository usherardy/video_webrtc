import React, {useCallback, useEffect} from 'react';
import { useSocket } from '../contexts/Socket';
import { usePeer} from '../contexts/Peer';

const RoomPage = () => {
    const {socket} = useSocket();
    const {createOffer} = usePeer();
    //
    const newUserJoined = async (data) => {
        const {emailId} = data;
        console.log("incoming connection from email:", emailId);
        const offer = await createOffer();
       // console.log("Inside room new user joined", offer);
        socket.emit("handshake", {emailId, offer}, [createOffer, socket]);

    }
    //
    const handleIncomingCall = useCallback((data) => {
        const{from, offer} = data;
        console.log("incomming call from ", from, offer);
    
    }, []);

    useEffect( () => { 
        socket.on("user-joined", newUserJoined);
        socket.on("incomming-call", handleIncomingCall);
}, [socket]);

    return(
        <div className='room-page'>
            <h1>Room</h1>
        </div>
    )

}
export default RoomPage;
