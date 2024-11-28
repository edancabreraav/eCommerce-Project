import { useState, useEffect } from 'react';
import {getOneProduct} from '../../services/remote/get/getOneProduct'
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import AddPresentacionModal from '../modals/AddPresentacionModal';
import UpdatePresentacionModal from '../modals/UpdatePresentacionModal';
import {delOneSubdocument} from '../../services/remote/delete/delOneSubdocument'

//Arreglo para las columnas
const ProductsColumns = [
    {
      accessorKey: "IdPresentaOK",
      header: "ID PRESENTA OK",
      size: 30, //small column
    },
    {
        accessorKey: "IdPresentaBK",
        header: "ID PRESENTA BK",
      size: 30, //small column
    },
    {
      accessorKey: "CodigoBarras",
      header: "CÓDIGO DE BARRAS",
      size: 30, //small column
    },
    {
        accessorKey: "DesPresenta",
        header: "DESCRIPCIÓN",
        size: 30, //small column
    },
    {
        accessorKey: "Indice",
        header: "INDICE",
        size: 30, //small column
    },
    {
        accessorKey: "Principal",
        header: "PRINCIPAL",
        size: 150, //small column
    },
  ];
 
  const PresentacionesTable = ({datosSeleccionados, setDatosSubDocSeleccionados}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductData] = useState([]);
    const [addPresentacionShowModal, setAddPresentacionShowModal] = useState(false);
    const [updatePresentacionShowModal, setUpdatePresentacionShowModal] = useState(false);
    const [selectedPresentacion, setSelectedPresentacion] = useState(null);

   
    const fetchData = async () => {
      setLoadingTable(true);
      try {
        if (datosSeleccionados.IdProdServOK === "0") {
            setLoadingTable(false);
            return;
        }
        const Product = await getOneProduct(datosSeleccionados.IdProdServOK);
        const ProductEstatus = Product.presentaciones;
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

    const sendDataRow = (rowData) => {
      // Accede a los datos necesarios del registro (rowData) y llama a tu método
      const {IdPresentaOK} = rowData.original;
      const {index} = rowData;
      // Mostrar en consola los datos del registro
      console.log("IdPresentaOK: ", IdPresentaOK);
      console.log("index", index)
      // Actualizar el estado de los datos seleccionados
      setDatosSubDocSeleccionados({IdPresentaOK, index});
    };

    const handleDelClick = async (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para borrar");
          return;
      }
      const Presentacion = selectedRows[0]?.original; //Guardamos la información de la Presentación seleccionada
      const IdPresentacionOK = Presentacion[Object.keys(Presentacion)[0]] //Extraemos el id

       await delOneSubdocument(datosSeleccionados.IdProdServOK, 'presentaciones', IdPresentacionOK);
       await fetchData();
    }

    const handleEditClick = (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para editar");
          return;
      }
      const Presentacion = selectedRows[0]?.original; //Información del Estatus seleccionado
      setSelectedPresentacion(Presentacion);
      setUpdatePresentacionShowModal(true);
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
                        <IconButton onClick={() => setAddPresentacionShowModal(true)}>
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
          <Dialog open={addPresentacionShowModal}>
            <AddPresentacionModal
              addPresentacionShowModal={addPresentacionShowModal}
              setAddPresentacionShowModal={setAddPresentacionShowModal}
              onClose={() => setAddPresentacionShowModal(false)}
              onPresentacionAdded={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
            />
          </Dialog>
          <Dialog open={updatePresentacionShowModal}>
            <UpdatePresentacionModal
              updatePresentacionShowModal={updatePresentacionShowModal}
              setUpdatePresentacionShowModal={setUpdatePresentacionShowModal}
              onClose={() => setUpdatePresentacionShowModal(false)}
              onPresentacionUpdated={fetchData}
              idProd = {datosSeleccionados.IdProdServOK}
              presentacionData={selectedPresentacion}
            />
          </Dialog>
        </Box>
      );
  };

  export default PresentacionesTable;
   