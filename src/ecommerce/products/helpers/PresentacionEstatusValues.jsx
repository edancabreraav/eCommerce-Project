import { PresentacionEstatusModel } from '../models/PresentacionEstatusModel';

//Obtenemos los valores capturados en la ventana modal enviados desde el evento onSubmit de Formik
export const PresentacionEstatusValues = (values) => {
    let PresentacionEstatus = PresentacionEstatusModel();

    PresentacionEstatus.IdTipoEstatusOK = values.IdTipoEstatusOK;
    PresentacionEstatus.Actual = values.Actual;
    PresentacionEstatus.Observacion = values.Observacion;

    return PresentacionEstatus
}