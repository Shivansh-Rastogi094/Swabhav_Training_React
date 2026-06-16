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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/aboutus" element={<AboutUs/>}>
        <Route path='new' element={<New/>}></Route>
        <Route path='old' element={<Old/>}></Route>
        </Route>
        {/* <Route path="/profile" element={<Profile/>}></Route> */}
        <Route path="/profile" element={<ProfileDetails/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
