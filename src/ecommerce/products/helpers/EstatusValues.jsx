import { EstatusModel } from '../models/EstatusModel';

//Obtenemos los valores capturados en la ventana modal enviados desde el evento onSubmit de Formik
export const EstatusValues = (values) => {
    let Estatus = EstatusModel();
    let actual="";

    if ( values.Actual!= "" && !values.Actual) actual = "S"
    else actual = values.Actual

    Estatus.IdTipoEstatusOK = values.IdTipoEstatusOK;
    Estatus.Actual = actual;
    Estatus.Observacion = values.Observacion;

    return Estatus
}