//Este archivo contiene funciones ASYNCRONAS 
//que nos ayuda a obtener la respuesta del servidor 
//y poder mandarla al SLICE y a su estado
import { getProdServAll } from './actions/commerceActions';
import { SET_DATA_PRODSERV } from './slices/commerceSlice';

export const GET_DATA_START = () => {
    return async (dispatch, getState) => {
        dispatch(
            SET_DATA_PRODSERV(
                    await getProdServAll(),
            )
        )
    };
};