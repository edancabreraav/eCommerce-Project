import { InfoAdModel } from '../models/InfoAdModel'

//Obtenemos los valores caputrados en la ventana modla enviados desde el evento onSubmit de Formik
export const InfoAdValues = (values) => {
    let InfoAd = InfoAdModel();

    InfoAd.IdEtiquetaOK = values.IdEtiquetaOK;
    InfoAd.IdEtiqueta = values.IdEtiqueta;
    InfoAd.Valor = values.Valor;
    InfoAd.IdTipoSeccionOK = values.IdTipoSeccionOK;
    InfoAd.Secuencia = values.Secuencia

    return InfoAd
}