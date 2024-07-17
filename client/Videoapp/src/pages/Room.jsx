import React, {useEffect} from 'react';
import { useSocket } from '../contexts/Socket';


const RoomPage = () => {
    const {socket} = useSocket();
    const newUserJoied = (data) => {
        const {emailId} = data;
        console.log("User joined the room", emailId);

    }
    useEffect( () => { socket.on("user-joined", newUserJoied)
    }, []);

    return(
        <div className='room-page'>
            <h1>Room</h1>


        </div>
    )

}
export default RoomPage;
