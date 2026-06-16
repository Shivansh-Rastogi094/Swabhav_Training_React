import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './Components/Navbar'
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import { Route, Routes } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import ProfileDetails from './Components/ProfileDetails'
import New from './Pages/New'
import Old from './Pages/Old'
import AdminDashboard from './Pages/AdminDashboard'
import AgentDashboard from './Pages/AgentDashboard'
import UserDashboard from './Pages/UserDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/agentdashboard' element={<AgentDashboard/>}></Route>
        <Route path='/userdashboard' element={<UserDashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
