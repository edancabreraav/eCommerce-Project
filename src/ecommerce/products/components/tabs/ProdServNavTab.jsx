import {
    Box,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  
  const ProdServTabs = ["Productos", "Estatus", "Presentaciones", "Info_Ad"];
  
  const ProdServNavTab = ({ currentRowInProdServTab, setCurrentNameTabInPrincipalTab, datosSeleccionados }) => {
    const [currenTabIndex, setCurrentTabIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
  
    
    const handleClose = () => {
      setModalOpen(false);
    };
  
    // Maneja el cambio de pestañas
    const handleChange = (event, newIndex) => {
      const selectedTab = ProdServTabs[newIndex].toUpperCase();
  
      if ( selectedTab !== "PRODUCTOS" && (!datosSeleccionados || datosSeleccionados.IdProdServOK === "0") ) {
        setModalOpen(true);
        return;
      }
      
      // Cambia la pestaña si todo está correcto
      setCurrentNameTabInPrincipalTab(selectedTab);
      setCurrentTabIndex(newIndex);
    };
  
    return (
      <Box
        sx={{
          border: (theme) => `2px solid ${theme.palette.divider}`,
          mx: 1,
          padding: 0.5,
        }}
      >
        <Tabs
          value={currenTabIndex}
          variant="fullWidth"
          onChange={handleChange}
          aria-label="icon tabs example"
          textColor="primary"
        >
          {ProdServTabs.map((tab) => {
            return (
              <Tab
                key={tab}
                label={tab}
              />
            );
          })}
        </Tabs>
  
        {/* Modal personalizado */}
        <Dialog
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Acción no permitida</DialogTitle>
          <DialogContent>
            Por favor, selecciona un producto antes de cambiar de pestaña.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  
  export default ProdServNavTab;
  