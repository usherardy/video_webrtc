import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home"

function App() {
  //const [count, setCount] = useState(0)
  return ( 
    <div className ="App">
     <Routes>
      <Route path ="/" element = {<Home/>}/>
      <Route path ="/room" element ={<p>hello</p>}/>
    </Routes>
      </div>
  )
}

export default App
