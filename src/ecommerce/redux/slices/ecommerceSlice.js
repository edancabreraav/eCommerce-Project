import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //DATA
	ecommerceDataArr: [],
   
   //SELECCIONES
   //ecommerceDataObj: {},
    //BOOLEANS/VARIABLES
}

const ecommerceSlice = createSlice({
    name: 'ECOMMERCE',
    initialState,
    reducers:{
        SET_DATA_ECOMMERCE: (state, action) => {
            console.log('<<REDUX-REDUCER>>:<<SET_DATA_ECOMMERCE>>', action.payload)
            //state.ecommerceDataArr = action.payload.ecommerceDataArr;
            state.ecommerceDataArr = action.payload
        }
    }
})

export const {
    SET_DATA_ECOMMERCE,
    //ADD_PRODUCT_SELECTED,
    //SWITCH_STATE,
} = ecommerceSlice.actions;
export default ecommerceSlice.reducer;
