import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Dashboard from './pages/Dashboard'
import { Routes,Route } from 'react-router-dom'
import Login from "./pages/Login"

function App() {
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState({})

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData}/>}></Route>
        <Route path="/admindashboard" element={<Dashboard userData={userData}/>}></Route>
      </Routes>
    </>
  )
}

export default App
