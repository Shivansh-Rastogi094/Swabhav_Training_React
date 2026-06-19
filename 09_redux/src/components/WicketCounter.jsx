import React from 'react'
import { addWicket } from '../features/matchSlice'
import { useDispatch, useSelector } from 'react-redux'

const WicketCounter = () => {
   const dispatch = useDispatch()
      const {wicket} = useSelector((state)=>state.match)
    return (
    <div>
        <h3>WicketCounter</h3>
        <p>Wickets={wicket}</p>
        <button onClick={()=>{
            dispatch(addWicket())
        }}>Add 1 Wicket</button>

    </div>
  )
}

export default WicketCounter