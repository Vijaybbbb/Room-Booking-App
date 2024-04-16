import { createSlice } from "@reduxjs/toolkit";

const adminLoginSlice = createSlice({
       name:'adminLogin',
       initialState:{
              userId:null
       },
       reducers:{
              storeAdmin:(state,action)=>{
                     state.userId = action.payload
              }
       }
})

export const {storeAdmin} = adminLoginSlice.actions
export default adminLoginSlice.reducer