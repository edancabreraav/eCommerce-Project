export function ArchivosModel() {
    let Archivos = {
        IdArchivoOK: { type: String },
        IdArchivoBK: { type: String },
        DesArchivo: { type: String },
        RutaArchivo: { type: String },
        Path: { type: String },
        IdTipoArchivoOK: { type: String },
        IdTipoSeccionOK: { type: String },
        Secuencia: { type: Number },
        Principal: { type: String }
    };
    return Archivos;
  }


