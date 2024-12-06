import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null
};


export const dataSlice = createSlice({
  name: 'data',
  initialState,

  reducers: {    
 
    getUserData: (state, action) => {
      state.data = action.payload;
    },
    resetData:(state)=>{
      state.data = null
    }
  },
 
});

export const { getUserData , resetData } = dataSlice.actions;



export default dataSlice.reducer;
