import React, {useCallback, useEffect} from 'react';
import { useSocket } from '../contexts/Socket';
import { usePeer, createAnswer, setRemoteAns} from '../contexts/Peer';

const RoomPage = () => {
    const {socket} = useSocket();
    const {createOffer, createAnswer, setRemoteAns} = usePeer();
    //
    const newUserJoined = async (data) => {
        const {emailId} = data;
        console.log("incoming connection from email:", emailId);
        const offer = await createOffer();
       // console.log("Inside room new user joined", offer);
        socket.emit("handshake", {emailId, offer}, [createOffer, socket]);

    }
    //
    const handleIncomingCall = useCallback(async (data) => {
        const{from, offer} = data;
        console.log("incomming call from ", from, offer);
        const ans = await createAnswer(offer);
        socket.emit('call-accepted', {emailiD: from, ans});
    
    }, [createAnswer, socket]);
    //
    const handleCallAccepted =useCallback( async(data) => {
        const {ans} =data;
        console.log("call got accepted", ans );
        await setRemoteAns(ans);
    }, [setRemoteAns])

    useEffect( () => { 
        socket.on("user-joined", newUserJoined);
        socket.on("incomming-call", handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted);

        return () => {
            socket.off ('user-joined', newUserJoined);
            socket.off ('incomming-call', handleIncomingCall);
            socket.off('call-accepted', handleCallAccepted);

        }
}, [handleIncomingCall, newUserJoined, socket]);

    return(
        <div className='room-page'>
            <h1>Room</h1>
        </div>
    )

}
export default RoomPage;
