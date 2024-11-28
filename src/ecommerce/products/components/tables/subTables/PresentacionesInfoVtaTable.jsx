import { useState, useEffect } from 'react';
import {getOneProduct} from '../../../services/remote/get/getOneProduct'
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, DialogTitle, DialogActions, Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import AddPresentacionInfoVtaModal from '../../modals/subModals/AddPresentacionInfoVtaModal';
import UpdatePresentacionInfoVtaModal from '../../modals/subModals/UpdatePresentacionInfoVtaModal';
import { delOnePresentacionSubdocument } from '../../../services/remote/delete/delOnePresentacionSubdocument';
import DetallesPresentacionInfoVtaModal from '../../modals/subModals/DetallesPresentacionInfoVta';

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
        header: "ID TIPO SECCION OK",
        size: 150, //small column
    },
      {
        accessorKey: "Secuencia",
        header: "SECUENCIA",
        size: 30, //small column
    },
  ];
 
  const PresentacionesInfoVtaTable = ({datosSeleccionados, datosSubDocSeleccionados}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductData] = useState([]);
    const [addPresentacionInfoVtaShowModal, setAddPresentacionInfoVtaShowModal] = useState(false);
    const [updatePresentacionInfoVtaShowModal, setUpdatePresentacionInfoVtaShowModal] = useState(false);
    const [selectedProduct, setselectedProduct] = useState(null);

    const [deletePresentacionInfoVtaShowModal, setDeletePresentacionInfoVtaShowModal] = useState(false);
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [detallesPresentacionInfoVtaShowModal, setDetallesPresentacionInfoVtaShowModal] = useState(false);
    const [selectedInfoVta, setSelectedInfoVta] = useState([]);

   
    const fetchData = async () => {
      setLoadingTable(true);
      try {
        if (datosSeleccionados.IdProdServOK === "0") {
            setLoadingTable(false);
            return;
        }
        const Product = await getOneProduct(datosSeleccionados.IdProdServOK);
        const ProductInfoVta = Product.presentaciones[datosSubDocSeleccionados.index].info_vta;
        setselectedProduct(Product.IdProdServBK);
        setProductData(ProductInfoVta);
        setLoadingTable(false);
    } catch (error) {
        console.error("Error al obtener los productos en useEffect de EstatusTable:", error);
    }
      setLoadingTable(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelClick = async (table) => {
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para borrar");
          return;
      }
      const InfoVta = selectedRows[0]?.original; //Guardamos la información de la Presentación seleccionada
      setSelectedInfoVta(InfoVta);
      setDeletePresentacionInfoVtaShowModal(true);
    }

    const handleEditClick = (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para editar");
          return;
      }
      const InfoVta = selectedRows[0]?.original; //Información de la información seleccionada
      setSelectedInfoVta(InfoVta);
      setUpdatePresentacionInfoVtaShowModal(true);
    };

    const sendDataRow = (rowData) => {
      setSelectedInfoVta(rowData.original);
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
             enableMultiRowSelection={false}
             muiTableBodyRowProps={({row}) => ({
              onClick: row.getToggleSelectedHandler(),
              onClickCapture: () => sendDataRow(row),
              sx: {cursor: 'pointer'},
            })}
             renderTopToolbarCustomActions={({ table }) => (
                <>
                  {/* ------- ACTIONS TOOLBAR INIT ------ */}
                  <Stack direction="row" sx={{ m: 1 }}>
                    <Box>
                      <Tooltip title="Agregar">
                        <IconButton onClick={() => setAddPresentacionInfoVtaShowModal(true)}>
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
                        <IconButton onClick={() => setDetallesPresentacionInfoVtaShowModal(true)}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                      <text class="PSeleccionado">Producto seleccionado: <b>{selectedProduct}</b></text>
                    </Box>
                  </Stack>
                  {/* ------- ACTIONS TOOLBAR END ------ */}
                </>
              )}
            />
          </Box>
          {/* M O D A L E S */}    
          <Dialog open={addPresentacionInfoVtaShowModal}>
            <AddPresentacionInfoVtaModal
              addPresentacionInfoVtaShowModal={addPresentacionInfoVtaShowModal}
              setAddPresentacionInfoVtaShowModal={setAddPresentacionInfoVtaShowModal}
              onClose={() => setAddPresentacionInfoVtaShowModal(false)}
              onPresentacionInfoVtaAdded={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
              idPres = {datosSubDocSeleccionados.IdPresentaOK}
            />
          </Dialog>

          <Dialog open={updatePresentacionInfoVtaShowModal}>
            <UpdatePresentacionInfoVtaModal
              updatePresentacionInfoVtaShowModal={updatePresentacionInfoVtaShowModal}
              setUpdatePresentacionInfoVtaShowModal={setUpdatePresentacionInfoVtaShowModal}
              onClose={() => setUpdatePresentacionInfoVtaShowModal(false)}
              onPresentacionInfoVtaUpdated={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
              idPres = {datosSubDocSeleccionados.IdPresentaOK}
              infovtaData={selectedInfoVta}
            />
          </Dialog>
          <Dialog open = {deletePresentacionInfoVtaShowModal} fullWidth>
            <DialogTitle sx={{textAlign: 'center'}}>¿Eliminar <strong>{selectedInfoVta?.IdEtiquetaOK}</strong>?</DialogTitle>
            <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant='contained' color='error' fullWidth
              onClick={async () => {
                try {
                  await delOnePresentacionSubdocument(datosSeleccionados.IdProdServOK, datosSubDocSeleccionados.IdPresentaOK, 'info_vta', selectedInfoVta.IdEtiquetaOK);
                  setMensajeExitoAlert('Información de venta eliminada')
                  setTimeout(() => {
                    setDeletePresentacionInfoVtaShowModal(false);
                    fetchData();
                  }, 2000);
                } catch (error) {
                  setMensajeExitoAlert(null);
                  setMensajeErrorAlert('No se pudo eliminar la información de venta', error)
                }
              }}
              >Eliminar</Button>
              <Button variant='outlined'fullWidth sx={{m:2}} onClick={() => setDeletePresentacionInfoVtaShowModal(false)}>Cancelar</Button>
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

          <Dialog open={detallesPresentacionInfoVtaShowModal}>
            <DetallesPresentacionInfoVtaModal 
              detallesPresentacionInfoVtaShowModal={detallesPresentacionInfoVtaShowModal}
              setDetallesPresentacionInfoVtaShowModal={setDetallesPresentacionInfoVtaShowModal}
              presentacionInfoVtaData={selectedInfoVta}
            />
          </Dialog>
        </Box>
      );
  };

  export default PresentacionesInfoVtaTable;
   