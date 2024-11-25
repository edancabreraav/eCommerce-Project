import Box from "@mui/material/Box";
import { useState } from "react";

import PresentacionesNavTab from "./PresentacionesNavTab";
import PresentacionesTable from "../tables/PresentacionesTable";

import PresentacionesEstatusTable from "../tables/subTables/PresentacionesEstatusTable";
import PresentacionesInfoVtaTable from "../tables/subTables/PresentacionesInfoVtaTable";
import PresentacionesArchivosTable from "../tables/subTables/PresentacionesArchivosTable";

export default function Presentaciones({datosSeleccionados}) {
  const [currentRowInPresentacionesTab, setCurrentRowInPresentacionesTab] =
    useState(0);

  //Indicamos que el estado inicial del tab page principal por default sera ESTATUS.
  const [currentTabInPresentacionesTab, setCurrentTabInPresentacionesTab] =
    useState("PRESENTACIONES");

    const [datosSubDocSeleccionados, setDatosSubDocSeleccionados] = useState({
      IdPresentaOK: "0"
  });

  return (
    <Box>
      <PresentacionesNavTab
        setCurrentRowInPresentacionesTab={setCurrentRowInPresentacionesTab}
        setCurrentNameTabInPresentacionesTab={setCurrentTabInPresentacionesTab}
      />
      {currentTabInPresentacionesTab == "PRESENTACIONES" && <PresentacionesTable datosSeleccionados={datosSeleccionados} setDatosSubDocSeleccionados={setDatosSubDocSeleccionados}/>}
      {/* Renderizar <ProdServTab /> si el valor de currentTabInPrincipalTab es igual a "PRODUCTOS"*/}
      {currentTabInPresentacionesTab == "ESTATUS" && <PresentacionesEstatusTable datosSeleccionados={datosSeleccionados} datosSubDocSeleccionados={datosSubDocSeleccionados}/>}
      {/* Renderizar <Estatus /> si el valor de currentTabInPrincipalTab es igual a "ESTATUS"*/}
      {currentTabInPresentacionesTab == "INFO_VTA" && <PresentacionesInfoVtaTable datosSeleccionados={datosSeleccionados} datosSubDocSeleccionados={datosSubDocSeleccionados}/>}
      {/* Renderizar <Estatus /> si el valor de currentTabInPrincipalTab es igual a "PRESENTACIONES"*/}
      {currentTabInPresentacionesTab == "ARCHIVOS" && <PresentacionesArchivosTable datosSeleccionados={datosSeleccionados} datosSubDocSeleccionados={datosSubDocSeleccionados}/>}

    </Box>
  );
}
