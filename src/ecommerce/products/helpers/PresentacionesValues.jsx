import { PresentacionesModel } from "../models/PresentacionesModel";

//Obtenemos los valores capturados en la ventana modal enviados desde el evento onSubmit de Formik
export const PresentacionesValues = (values) => {
    let Presentaciones = PresentacionesModel();

    Presentaciones.IdPresentaOK = values.IdPresentaOK;
    Presentaciones.IdPresentaBK = values.IdPresentaBK;
    Presentaciones.CodigoBarras = values.CodigoBarras;
    Presentaciones.DesPresenta = values.DesPresenta;
    Presentaciones.Indice = values.Indice;
    Presentaciones.Principal = values.Principal;

    return Presentaciones
}