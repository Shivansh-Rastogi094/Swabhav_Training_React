import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ScoreBoard from "./components/ScoreBoard"
import WicketCounter from './components/WicketCounter'

function App() {
  
  return (
    <>
    <ScoreBoard></ScoreBoard> 
    <WicketCounter/>   
    </>
  )
}

export default App
