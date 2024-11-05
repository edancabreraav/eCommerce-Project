import { configureStore } from "@reduxjs/toolkit";
import ecommerceSlice from "../slices/ecommerceSlice"
//import productosSlice from "../slices/usuarios/productosSlice";
const store = configureStore({
    reducer: {
      ecommerceReducer: ecommerceSlice,
      //productosSliceReducer: productosSlice,
    },
  });
  
  export default store;