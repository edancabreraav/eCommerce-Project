import { useState, useEffect } from 'react';
import {getOneProduct} from '../../../services/remote/get/getOneProduct'
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

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
                        <IconButton >
                          <AddCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton >
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
        </Box>
      );
  };

  export default PresentacionesEstatusTable;
   