import React from 'react'
import { useContext } from 'react'
import { ThemeDataContext } from '../context/ThemeContext'

const Child2 = () => {
    const {theme,setTheme} = useContext(ThemeDataContext)
    setTheme('Dark')
     return (
    <div>Child2 {theme}</div>
  )
}

export default Child2