import React from 'react'
import Child2 from './Child2'
import { useContext } from 'react'
import { ThemeDataContext } from '../context/ThemeContext'

const Child1 = () => {
     const {theme} = useContext(ThemeDataContext)
  return (
    <> 
    <div>Child1 {theme}</div>
    <Child2 ></Child2>
    </>
  )
}

export default Child1