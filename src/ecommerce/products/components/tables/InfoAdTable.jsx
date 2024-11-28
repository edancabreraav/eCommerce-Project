import { useState, useEffect } from 'react';
import {getOneProduct} from '../../services/remote/get/getOneProduct'
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, DialogTitle, DialogActions, Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import AddInfoAdModal from '../modals/AddInfoAdModal';
import UpdateInfoAdModal from '../modals/UpdateInfoAdModal';
import { delOneSubdocument } from '../../services/remote/delete/delOneSubdocument';

//Arreglo para las columnas
const ProductsColumns = [
    {
      accessorKey: "IdEtiquetaOK",
      header: "ID ETIQUETA OK",
      size: 30, //small column
    },
    {
      accessorKey: "IdEtiqueta",
      header: "ID ETIQUETA",
      size: 30, //small column
    },
    {
      accessorKey: "Valor",
      header: "VALOR",
      size: 30, //small column
    },
    {
        accessorKey: "IdTipoSeccionOK",
        header: "ID TIPO SECCIÓN OK",
        size: 30, //small column
    },
    {
        accessorKey: "Secuencia",
        header: "SECUENCIA",
        size: 150, //small column
    },
  ];
 
  const InfoAdTable = ({datosSeleccionados}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductData] = useState([]);
    const [addInfoAdShowModal, setAddInfoAdShowModal] = useState(false);
    const [updateInfoAdShowModal, setUpdateInfoAdShowModal] = useState(false);
    const [selectedInfoAd, setSelectedInfoAd] = useState(null);

    const [deleteInfoAdShowModal, setDeleteInfoAdShowModal] = useState(false);
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
   
    const fetchData = async () => {
      setLoadingTable(true);
      try {
        if (datosSeleccionados.IdProdServOK === "0") {
            setLoadingTable(false);
            return;
        }
        const Product = await getOneProduct(datosSeleccionados.IdProdServOK);
        const ProductEstatus = Product.info_ad;
        setProductData(ProductEstatus);
        setLoadingTable(false);
    } catch (error) {
        console.error("Error al obtener los productos en useEffect de EstatusTable:", error);
    }
      setLoadingTable(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    //Función para guardar la información a eliminar y mostrar la modal de confirmación de eliminación
    const handleDelClick = async (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para borrar");
          return;
      }
      const InfoAd = selectedRows[0]?.original; //Guardamos la información del InfoAd seleccionado
      setSelectedInfoAd(InfoAd);
      setDeleteInfoAdShowModal(true)
    }

    const handleEditClick = (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para editar");
          return;
      }
      const InfoAd = selectedRows[0]?.original; //Información de la Información Adicional seleccionada
      setSelectedInfoAd(InfoAd);
      setUpdateInfoAdShowModal(true);
    };

    return (
        <Box>
          <Box>
            <MaterialReactTable
             columns={ProductsColumns}
             data={productsData}
             initialState={{ density: "compact", showGlobalFilter: true }}
             state={{ isLoading: loadingTable }}
             enableRowSelection={true}
             muiTableBodyRowProps={({row}) => ({
              onClick: row.getToggleSelectedHandler(),
              // onClickCapture: () => sendDataRow(row),
              sx: {cursor: 'pointer'},
            })}
             renderTopToolbarCustomActions={({ table }) => (
                <>
                  {/* ------- ACTIONS TOOLBAR INIT ------ */}
                  <Stack direction="row" sx={{ m: 1 }}>
                    <Box>
                      <Tooltip title="Agregar">
                        <IconButton onClick={() => setAddInfoAdShowModal(true)}>
                          <AddCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleEditClick(table)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => handleDelClick(table)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Detalles ">
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                  {/* ------- ACTIONS TOOLBAR END ------ */}
                </>
              )}
            />
          </Box>  
          {/* M O D A L E S */}
          <Dialog open={addInfoAdShowModal}>
            <AddInfoAdModal
              addInfoAdShowModal={addInfoAdShowModal}
              setAddInfoAdShowModal={setAddInfoAdShowModal}
              onClose={() => setAddInfoAdShowModal(false)}
              onInfoAdAdded={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
            />
          </Dialog>
          <Dialog open={updateInfoAdShowModal}>
            <UpdateInfoAdModal
              updateInfoAdShowModal={updateInfoAdShowModal}
              setUpdateInfoAdShowModal={setUpdateInfoAdShowModal}
              onClose={() => setUpdateInfoAdShowModal(false)}
              onInfoAdUpdated={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
              infoAdData = {selectedInfoAd}
            />
          </Dialog>
          {/*Modal de confirmación de eliminación*/}
          <Dialog open={deleteInfoAdShowModal} fullWidth>
              <DialogTitle sx={{ textAlign: "center" }}>¿Eliminar: <strong>{selectedInfoAd?.IdEtiquetaOK}</strong>?</DialogTitle>
              <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
                <Button variant='contained' color='error' fullWidth 
              onClick={async () => {
                try {
                  await delOneSubdocument(datosSeleccionados.IdProdServOK, 'info_ad', selectedInfoAd.IdEtiquetaOK);
                    setMensajeExitoAlert("Producto eliminado");
                    setTimeout(() => {
                      setDeleteInfoAdShowModal(false); // Cierra el cuadro de diálogo
                      fetchData(); // Actualiza los datos de la tabla
                    }, 2000);
                } catch (error) {
                  setMensajeExitoAlert(null);
                  setMensajeErrorAlert("No se pudo eliminar el producto", error);
                }
            }}
              >Eliminar
              </Button>
              <Button variant='outlined' fullWidth sx={{m:2}} onClick={() => setDeleteInfoAdShowModal(false)}>Cancelar</Button>
              {mensajeErrorAlert && (
                  <Alert severity="error" >
                    <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                  </Alert>
                )}
                {mensajeExitoAlert && (
                  <Alert severity="success" >
                    <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                  </Alert>
                )}
              </DialogActions>
          </Dialog>
        </Box>
      );
  };

  export default InfoAdTable;
   