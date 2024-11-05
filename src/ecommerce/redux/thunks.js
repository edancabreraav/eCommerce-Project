//NOTA: Este archivo contiene funciones ASYNCRONAS 
//que nos ayuda a obtener la respuesta del servidor 
//y poder mandarla al SLICE y a su estado
import { getEcommerceAll } from './actions/ecommerceActions';
import { SET_DATA_ECOMMERCE } from './slices/ecommerceSlice';

export const GET_DATA_START = () => {
    return async (dispatch, getState) => {
        dispatch(
            SET_DATA_ECOMMERCE(
                //FIC: lo que esta comentado es para cuando se utiliza
                //un reducer que contedra un arreglo de colecciones
                //tal sera el caso como el de catalogos.
                //{
                    //ecommerceDataArr: await getEcommerceAll(),
                    await getEcommerceAll(),
                //}
            )
        )
    };
};