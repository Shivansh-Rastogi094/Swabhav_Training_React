import { configureStore } from '@reduxjs/toolkit'
import matchReducer from "../features/matchSlice"
import playerReducer from "../features/playerSlice"
const store = configureStore({
    reducer:{
        match:matchReducer,
        player:playerReducer,
    }
})

export default store