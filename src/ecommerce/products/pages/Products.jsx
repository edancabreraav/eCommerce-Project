import { useState } from "react";
import { Box } from "@mui/material";
import { useEffect } from "react";

import ProdServNavTab from "../components/tabs/ProdServNavTab";
import Presentaciones from "../components/tabs/PresentacionesTab";
import ProductsTable from "../components/tables/ProductsTable";
import EstatusTable from "../components/tables/EstatusTable";
import InfoAdTable from "../components/tables/InfoAdTable";
import { current } from "@reduxjs/toolkit";


export default function Products() {
  
  const [currentRowInProdServTab, setCurrentRowInProdServTab] = useState(0);
  const [currentTabInPrincipalTab, setCurrentTabInPrincipalTab] = useState("PRODUCTOS");
  const [currentSubTabInPrincipalTab, setCurrentSubTabInPrincipalTab] = useState("");
  const [datosSeleccionados, setDatosSeleccionados] = useState({IdProdServOK: "0"});
  
  return (
    <Box>

      {/* 
          componentes del hijo          componente del UseState
          setCurrentRowInProdServTab={setCurrentRowInProdServTab} 
      */}
      <ProdServNavTab
        setCurrentRowInProdServTab = { setCurrentRowInProdServTab }
        setCurrentNameTabInPrincipalTab = { setCurrentTabInPrincipalTab }
        setDatosSeleccionados = { setDatosSeleccionados }
        datosSeleccionados = { datosSeleccionados } 
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
        <Presentaciones datosSeleccionados = { datosSeleccionados } />
      )}
    </Box>
  );
}
