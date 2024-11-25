import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const ProdServTabs = ["Productos", "Estatus", "Presentaciones", "Info_Ad"];

const ProdServNavTab = ({currentRowInProdServTab, setCurrentNameTabInPrincipalTab}) => {
    //Para saber cual es el numero de Tab seleccionado.
    const [currenTabIndex, setCurrentTabIndex] = useState(0);
    
    const handleChange = (e) => {
        
        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        
        //Actualizar el nombre de la pestaña seleccionada.
        setCurrentNameTabInPrincipalTab(e.target.innerText.toUpperCase());
        
        switch (e.target.innerText.toUpperCase()) {
            case "PRODUCTOS":
                setCurrentTabIndex(0);
                break;
            case "ESTATUS":
                setCurrentTabIndex(1);
                break;
            case "PRESENTACIONES":
                setCurrentTabIndex(2);
                break;
            case "INFO_AD":
                setCurrentTabIndex(3);
                break;
        }

    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {ProdServTabs.map((tab) => {
                    return <Tab key={tab} label={tab} disabled ={currentRowInProdServTab === null}/>;
                })}
            </Tabs>
        </Box>
    );
};
export default ProdServNavTab;