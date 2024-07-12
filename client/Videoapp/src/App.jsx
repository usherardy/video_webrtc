import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'

function App() {
  //const [count, setCount] = useState(0)
  return ( 
    <div className ="App">
     <Routes>
      <Route path ="/user" element = {<h1>hello </h1>}/>
    </Routes>
      </div>
  )
}

export default App
