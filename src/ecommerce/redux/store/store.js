import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/ecommerceSlice";

//import productosSlice from "../slices/usuarios/productosSlice";
const store = configureStore({
    reducer: {
      institutesReducer: institutesSlice,
      //productosSliceReducer: productosSlice,
    },
  });
  
  export default store;