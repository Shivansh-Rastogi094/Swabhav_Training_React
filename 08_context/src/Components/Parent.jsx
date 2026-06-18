import React from 'react'
import { useState } from 'react';
import Child1 from './Child1';
import { useContext } from 'react';
import { ThemeDataContext } from '../context/ThemeContext';

const Parent = () => {
    const {theme} = useContext(ThemeDataContext)
  return (
    <>
    <div>Parent {theme}</div>
    <Child1>
        <h2>Im making Changes</h2>
        <h2>This is fun</h2>
    </Child1>
    </>
  )
}

export default Parent