import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";

const PresentacionesTabs = ["Presentaciones","Estatus", "Info_Vta", "Archivos"];

const PresentacionesNavTab = ({currentRowInPresentacionesTab, setCurrentNameTabInPresentacionesTab}) => {
    //Para saber cual es el numero de Tab seleccionado.
    const [currenTabIndex, setCurrentTabIndex] = useState(0);
    
    const handleChange = (e) => {
        
        console.log("entro al handleChange", e.target.innerText.toUpperCase());
        
        //Actualizar el nombre de la pestaña seleccionada.
        setCurrentNameTabInPresentacionesTab(e.target.innerText.toUpperCase());
        
        switch (e.target.innerText.toUpperCase()) {
            case "PRESENTACIONES":
                setCurrentTabIndex(0);
                break;
            case "ESTATUS":
                setCurrentTabIndex(1);
                break;
            case "INFO_VTA":
                setCurrentTabIndex(2);
                break;
            case "ARCHIVOS":
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
                {PresentacionesTabs.map((tab) => {
                    return <Tab key={tab} label={tab} disabled ={currentRowInPresentacionesTab === null}/>;
                })}
            </Tabs>
        </Box>
    );
};
export default PresentacionesNavTab;