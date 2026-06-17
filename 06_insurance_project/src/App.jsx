import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AdminDashboard from './pages/AdminDashboard'
import { Routes,Route } from 'react-router-dom'
import Login from "./pages/Login"
import UserDashboard from './pages/UserDashboard'

function App() {
  const [count, setCount] = useState(0)
  const [userData, setUserData] = useState({})

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setUserData={setUserData}/>}></Route>
        <Route path="/admindashboard" element={<AdminDashboard userData={userData}/>}></Route>
        <Route path="/userdashboard" element={<UserDashboard userData={userData}/>}></Route>
      </Routes>
    </>
  )
}

export default App
