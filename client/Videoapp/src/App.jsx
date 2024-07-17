import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import { SocketProvider } from './contexts/Socket';
import RoomPage from './pages/Room';
import { PeerProvider } from './contexts/peer';

function App() {
  //const [count, setCount] = useState(0)
  return ( 
    <div className ="App">
    <SocketProvider>
      <PeerProvider>
      <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/room/:roomId" element ={<RoomPage/>} />
      </Routes>
      </PeerProvider>
    </SocketProvider>
      </div>
  )
}

export default App
