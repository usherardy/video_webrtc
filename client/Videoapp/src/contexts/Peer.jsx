import React, { useMemo } from "react";

const PeerContext = React.createContext(null);

export const PeerProvider = (props) => {
    const peer =useMemo ( () => new RTCPeerConnection({
        //STURN servers
        iceservers: [{
            urls:[
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
            ],
        },],
    }), []);  

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offfer);
    return offer;   
 }
    return (
        
        <PeerContext.Provider value = {{ peer, createOffer}}>
            {props.children}
        </PeerContext.Provider>
    )
}

