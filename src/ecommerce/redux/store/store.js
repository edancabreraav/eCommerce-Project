import { configureStore } from "@reduxjs/toolkit";
import prodServSlice from "../slices/commerceSlice";

const store = configureStore({
    reducer: {
      prodServReducer: prodServSlice,
    },
  });
  
  export default store;