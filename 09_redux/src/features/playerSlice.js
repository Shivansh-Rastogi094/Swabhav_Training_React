import { createSlice } from "@reduxjs/toolkit";
import { addSingleRun } from "./matchSlice";

const playerSlice = createSlice({
    name:"player",
    initialState:{
        pruns:0
    },
    reducers:{},
    extraReducers:(builder)=>{
            builder.addCase(addSingleRun, (state)=>{
                state.pruns+=1
            })
    }
})

export default playerSlice.reducer