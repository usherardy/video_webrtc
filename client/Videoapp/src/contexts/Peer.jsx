import React, { useContext, useMemo } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => useContext(PeerContext);

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
        await peer.setLocalDescription(offer);
       //console.log("Inside function",offer);
    return offer;   
 }
    return (
        
        <PeerContext.Provider value = {{ peer, createOffer}}>
            {props.children}
        </PeerContext.Provider>
    );
}

