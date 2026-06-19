import { createSlice } from "@reduxjs/toolkit";

const matchSlice = createSlice({
    name:'match',
    initialState:{
        runs:0,wicket:0,overs:0
    },
    reducers:{
        addSingleRun:(state)=>{
            state.runs+=1;
        },
    
        addWicket:(state)=>{
            state.wicket+=1;
        }
    }
})

export default matchSlice.reducer
export const {addSingleRun} = matchSlice.actions
export const {addWicket} = matchSlice.actions