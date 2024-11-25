import { useState, useEffect } from 'react';
import {getOneProduct} from '../../services/remote/get/getOneProduct'
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import AddEstatusModal from '../modals/AddEstatusModal';
import UpdateEstatusModal from '../modals/UpdateEstatusModal';
import {delOneSubdocument} from '../../services/remote/delete/delOneSubdocument'

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
 
  const EstatusTable = ({datosSeleccionados}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductData] = useState([]);
    const [addEstatusShowModal, setAddEstatusShowModal] = useState(false);
    const [updateEstatusShowModal, setUpdateEstatusShowModal] = useState(false);
    const [selectedEstatus, setSelectedEstatus] = useState(null);
   
    const fetchData = async () => {
      setLoadingTable(true);
      try {
        if (datosSeleccionados.IdProdServOK === "0") {
            setLoadingTable(false);
            return;
        }
        const Product = await getOneProduct(datosSeleccionados.IdProdServOK);
        const ProductEstatus = Product.estatus;
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

    //Función para manejar la lógica de eliminar un Estatus
    const handleDelClick = async (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para borrar");
          return;
      }
      const Estatus = selectedRows[0]?.original; //Guardamos la información del Estatus seleccionado
      const IdEstatusOK = Estatus[Object.keys(Estatus)[0]] //Extraemos el id

      await delOneSubdocument(datosSeleccionados.IdProdServOK, 'estatus', IdEstatusOK);
      await fetchData();
    }

    const handleEditClick = (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para editar");
          return;
      }
      const Estatus = selectedRows[0]?.original; //Información del Estatus seleccionado
      setSelectedEstatus(Estatus);
      setUpdateEstatusShowModal(true);
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
                        <IconButton onClick={() => setAddEstatusShowModal(true)}>
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
          <Dialog open={addEstatusShowModal}>
            <AddEstatusModal
              addEstatusShowModal={addEstatusShowModal}
              setAddEstatusShowModal={setAddEstatusShowModal}
              onClose={() => setAddEstatusShowModal(false)}
              onEstatusAdded={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
            />
          </Dialog>
          <Dialog open={updateEstatusShowModal}>
            <UpdateEstatusModal
              updateEstatusShowModal={updateEstatusShowModal}
              setUpdateEstatusShowModal={setUpdateEstatusShowModal}
              onClose={() => setUpdateEstatusShowModal(false)}
              onEstatusUpdated={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
              estatusData = {selectedEstatus}
            />
          </Dialog>
        </Box>
      );
  };

  export default EstatusTable;
   