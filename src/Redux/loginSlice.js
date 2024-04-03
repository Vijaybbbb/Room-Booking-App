import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
       name:'login',
       initialState:{
              userId:null
       },
       reducers:{
              storeUser:(state,action)=>{
                     state.userId = action.payload
              }
       }
})

export const {storeUser} = loginSlice.actions
export default loginSlice.reducer