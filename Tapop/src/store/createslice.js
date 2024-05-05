import { createSlice } from '@reduxjs/toolkit'

const initialState =[{}]

export const Slice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    increment: (state,action) => {
     state=state.push(action.payload);
    },
    
  },
})


export const { increment } = Slice.actions

export default Slice.reducer