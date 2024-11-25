import { EstatusModel } from '../models/EstatusModel';

//Obtenemos los valores capturados en la ventana modal enviados desde el evento onSubmit de Formik
export const EstatusValues = (values) => {
    let Estatus = EstatusModel();

    Estatus.IdTipoEstatusOK = values.IdTipoEstatusOK;
    Estatus.Actual = values.Actual;
    Estatus.Observacion = values.Observacion;

    return Estatus
}