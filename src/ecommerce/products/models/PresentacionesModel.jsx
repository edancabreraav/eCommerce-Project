export function PresentacionesModel() {
  let Presentaciones = {
    IdPresentaOK: { type: String },
    IdPresentaBK: { type: String },
    CodigoBarras: { type: String },
    DesPresenta: { type: String },
    Indice: { type: String },
    Principal: { type: String }
  };
  return Presentaciones;
}
