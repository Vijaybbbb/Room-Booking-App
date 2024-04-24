import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
       name:'checkout',
       initialState:{
              hotelId:null,
              hotelName:null,
              userId:null,
              rooms:[],
              price:null,
              dates:null,
              roomNumbers:[]
       },
       reducers:{
              addCheckout:(state,action)=>{
                     const {hotelId,hotelName,userId,rooms,price,dates,roomNumbers} = action.payload
                     state.hotelId = hotelId
                     state.hotelName = hotelName
                     state.userId = userId
                     state.rooms = rooms
                     state.price = price
                     state.dates = dates
                     state.roomNumbers = roomNumbers

              }
       }
})

export const {addCheckout} = checkoutSlice.actions
export default checkoutSlice.reducer