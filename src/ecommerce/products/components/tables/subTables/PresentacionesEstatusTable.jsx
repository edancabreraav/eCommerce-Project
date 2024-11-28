import { useState, useEffect } from 'react';
import {getOneProduct} from '../../../services/remote/get/getOneProduct'
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, DialogTitle, DialogActions, Alert } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import AddPresentacionEstatusModal from '../../modals/subModals/AddPresentacionEstatusModal'
import UpdatePresentacionEstatusModal from '../../modals/subModals/UpdatePresentacionEstatusModal';
import { delOnePresentacionSubdocument } from '../../../services/remote/delete/delOnePresentacionSubdocument';


//Arreglo para las columnas
const ProductsColumns = [
    {
      accessorKey: "IdTipoEstatusOK",
      header: "ID ESTATUS OK",
      size: 30, //small column
    },
    {
      accessorKey: "Actual",
      header: "ACTUAL",
      size: 30, //small column
    },
    {
      accessorKey: "Observacion",
      header: "OBSERVACION",
      size: 150, //small column
    }
  ];
 
  const PresentacionesEstatusTable = ({datosSeleccionados, datosSubDocSeleccionados}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductData] = useState([]);
    const [addPresentacionEstatusShowModal, setAddPresentacionEstatusShowModal] = useState(false);
    const [updatePresentacionEstatusShowModal, setUpdatePresentacionEstatusShowModal] = useState(false);
    const [selectedEstatus, setSelectedEstatus] = useState(null);

    const [deletePresentacionEstatusShowModal, setDeletePresentacionEstatusShowModal] = useState(false);
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
        const ProductEstatus = Product.presentaciones[datosSubDocSeleccionados.index].estatus;
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

    const handleDelClick = async (table) => {
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para borrar");
          return;
      }
      const Estatus = selectedRows[0]?.original; //Guardamos la información de la Presentación seleccionada
      setSelectedEstatus(Estatus);
      setDeletePresentacionEstatusShowModal(true);
    }

    const handleEditClick = (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para editar");
          return;
      }
      const Estatus = selectedRows[0]?.original; //Información del Estatus seleccionado
      setSelectedEstatus(Estatus);
      setUpdatePresentacionEstatusShowModal(true);
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
              // onClickCapture: () => sendDataRow(row),
              sx: {cursor: 'pointer'},
            })}
             renderTopToolbarCustomActions={({ table }) => (
                <>
                  {/* ------- ACTIONS TOOLBAR INIT ------ */}
                  <Stack direction="row" sx={{ m: 1 }}>
                    <Box>
                      <Tooltip title="Agregar">
                        <IconButton onClick={() => setAddPresentacionEstatusShowModal(true)}>
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
          <Dialog open={addPresentacionEstatusShowModal}>
            <AddPresentacionEstatusModal
              addPresentacionEstatusShowModal={addPresentacionEstatusShowModal}
              setAddPresentacionEstatusShowModal={setAddPresentacionEstatusShowModal}
              onClose={() => setAddPresentacionEstatusShowModal(false)}
              onPresentacionEstatusAdded={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
              idPres = {datosSubDocSeleccionados.IdPresentaOK}
            />
          </Dialog>
          <Dialog open={updatePresentacionEstatusShowModal}>
            <UpdatePresentacionEstatusModal
              updatePresentacionEstatusShowModal={updatePresentacionEstatusShowModal}
              setUpdatePresentacionEstatusShowModal={setUpdatePresentacionEstatusShowModal}
              onClose={() => setUpdatePresentacionEstatusShowModal(false)}
              onPresentacionEstatusUpdated={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
              idPres = {datosSubDocSeleccionados.IdPresentaOK}
              estatusData={selectedEstatus}
            />
          </Dialog>
          {/*Modal de confirmación de eliminación*/}
          <Dialog open={deletePresentacionEstatusShowModal} fullWidth>
            <DialogTitle sx={{textAlign:'center'}}>¿Eliminar <strong>{selectedEstatus?.IdTipoEstatusOK}</strong>?</DialogTitle>
            <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant='contained' color='error' fullWidth
              onClick={async () => {
                try {
                  await delOnePresentacionSubdocument(datosSeleccionados.IdProdServOK, datosSubDocSeleccionados.IdPresentaOK, 'estatus', selectedEstatus.IdTipoEstatusOK);
                  setMensajeExitoAlert('Estatus eliminado');
                  setTimeout(() => {
                    setDeletePresentacionEstatusShowModal(false);
                    fetchData();
                  }, 2000);
                } catch (error) {
                  setMensajeExitoAlert(null);
                  setMensajeErrorAlert('No se pudo eliminar el estatus', error)
                }
              }}
              >Eliminar</Button>
              <Button variant='outlined' fullWidth sx={{m:2}} onClick={() => setDeletePresentacionEstatusShowModal(false)}>Cancelar</Button>
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

  export default PresentacionesEstatusTable;
   