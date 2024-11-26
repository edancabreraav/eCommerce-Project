import { PresentacionInfoVtaModel } from "../models/PresentacionInfoVtaModel";

//Obtenemos los valores capturados en la ventana modal enviados desde el evento onSubmit de Formik
export const InfoVtaValues = (values) => {
    let InfoVta = PresentacionInfoVtaModel();

    InfoVta.IdEtiquetaOK = values.IdEtiquetaOK;
    InfoVta.IdEtiqueta = values.IdEtiqueta;
    InfoVta.Valor = values.Valor;
    InfoVta.IdTipoSeccionOK = values.IdTipoSeccionOK;
    InfoVta.Secuencia = values.Secuencia;

    return InfoVta
}