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
      accessorKey: "IdArchivoOK",
      header: "ID ARCHIVO OK",
      size: 30, //small column
    },
    {
        accessorKey: "IdArchivoBK",
        header: "ID ARCHIVO BK",
      size: 30, //small column
    },
    {
      accessorKey: "DesArchivo",
      header: "DESCRIPCION",
      size: 30, //small column
    },
    {
        accessorKey: "RutaArchivo",
        header: "RUTA",
        size: 30, //small column
      },
      {
        accessorKey: "Path",
        header: "PATH",
        size: 30, //small column
      },
      {
        accessorKey: "IdTipoArchivoOK",
        header: "ID TIPO ARCHIVO OK",
        size: 30, //small column
      },
      {
        accessorKey: "IdTipoSeccionOK",
        header: "ID TIPO SECCION OK",
        size: 30, //small column
      },
      {
        accessorKey: "Secuencia",
        header: "SECUENCIA",
        size: 30, //small column
      },
      {
        accessorKey: "Principal",
        header: "PRINCIPAL",
        size: 30, //small column
      },
  ];
 
  const PresentacionesArchivosTable = ({datosSeleccionados, datosSubDocSeleccionados}) => {
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
        const ProductEstatus = Product.presentaciones[datosSubDocSeleccionados.index].archivos;
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

  export default PresentacionesArchivosTable;
   