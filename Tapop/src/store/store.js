import { configureStore } from '@reduxjs/toolkit'
import  Slice from './createslice'
 const store = configureStore({
  reducer: {
    profile:Slice
  },
});
export default store