import { useState } from "react";
import { Box } from "@mui/material";

import ProdServNavTab from "../components/tabs/ProdServNavTab";
import Presentaciones from "../components/tabs/PresentacionesTab";
import ProductsTable from "../components/tables/productsTable";
import EstatusTable from "../components/tables/EstatusTable";
import InfoAdTable from "../components/tables/InfoAdTable";

export default function Products() {
  //Indicamos que al iniciar no hay ningun Producto seleccionado. De momento no es funcional pues no tenemos ninguna tabla dentro de esta pestaña, pero nos servirá más adelante
  const [currentRowInProdServTab, setCurrentRowInProdServTab] = useState(0);

  //Indicamos que el estado inicial del tab page principal por default sera PRODUCTOS.
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] =
    useState("PRODUCTOS");
  const [datosSeleccionados, setDatosSeleccionados] = useState({
    IdProdServOK: "0",
  });

  return (
    <Box>
      <ProdServNavTab
        setCurrentRowInProdServTab={setCurrentRowInProdServTab}
        setCurrentNameTabInPrincipalTab={setCurrentTabInPrincipalTab}
      />

      {currentTabInPrincipalTab == "PRODUCTOS" && (
        <ProductsTable
          setDatosSeleccionados={setDatosSeleccionados}
          datosSeleccionados={datosSeleccionados}
        />
      )}

      {currentTabInPrincipalTab == "ESTATUS" && (
        <EstatusTable datosSeleccionados={datosSeleccionados} />
      )}

      {currentTabInPrincipalTab == "INFO_AD" && (
        <InfoAdTable datosSeleccionados={datosSeleccionados} />
      )}
      {currentTabInPrincipalTab == "PRESENTACIONES" && (
        <Presentaciones datosSeleccionados={datosSeleccionados} />
      )}
    </Box>
  );
}
