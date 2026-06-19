import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSingleRun } from '../features/matchSlice'

const ScoreBoard = () => {
    const dispatch = useDispatch()
    const {runs,wicket,overs} = useSelector((state)=>state.match)
    const {pruns} = useSelector((state)=>state.player)
  return (
    <>
    <div>
        <h1>ScoreBoard</h1>
        <p>Runs ={runs} | Wicket={wicket} | Overs ={overs}</p>
        <p>Player Score = Runs:{pruns}</p>
        <button onClick={()=>{
            dispatch(addSingleRun())
        }}>Add 1 Run</button>
    </div>
    
    
    
    </>
  )
}

export default ScoreBoard