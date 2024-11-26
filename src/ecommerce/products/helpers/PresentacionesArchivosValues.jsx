import { ArchivosModel } from '../models/PresentacionArchivosModel';

//Obtenemos los valores capturados en la ventana modal enviados desde el evento onSubmit de Formik
export const ArchivosValues = (values) => {
    let Archivos = ArchivosModel();

    Archivos.IdArchivoOK = values.IdArchivoOK;
    Archivos.IdArchivoBK = values.IdArchivoBK;
    Archivos.DesArchivo = values.DesArchivo;
    Archivos.RutaArchivo = values.RutaArchivo;
    Archivos.Path = values.Path;
    Archivos.IdTipoArchivoOK = values.IdTipoArchivoOK;
    Archivos.IdTipoSeccionOK = values.IdTipoSeccionOK;
    Archivos.Secuencia = values.Secuencia;
    Archivos.Principal = values.Principal;

    return Archivos
}