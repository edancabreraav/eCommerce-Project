import { createSlice } from '@reduxjs/toolkit';
const initialState = {

	prodServDataArr: [],
  
}
const prodServSlice = createSlice({
	name: 'ProdServ',
	initialState,
	reducers: {
		SET_DATA_PRODSERV: (state, action) => { 			
                        console.log('<<REDUX-REDUCER>>:<<SET_DATA_PRODSERV>>', action.payload);
			state.prodServDataArr = action.payload
		}
    }
}
);
export const {
	SET_DATA_PRODSERV,
} = prodServSlice.actions;
export default prodServSlice.reducer;