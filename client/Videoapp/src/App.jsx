import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"
import { SocketProvider } from './context/Socket';
function App() {
  //const [count, setCount] = useState(0)
  return ( 
    <div className ="App">
    <SocketProvider>
      <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="/room" element ={<p>hello</p>}/>
      </Routes>
    </SocketProvider>
      </div>
  )
}

export default App
