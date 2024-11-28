import { useState, useEffect } from 'react';
// import ProductsStaticData from '../../../../db/ecommerce/json/products/productsData';
import { getAllProducts } from '../../services/remote/get/getAllProducts';
import { delOneProduct } from '../../services/remote/delete/delOneProduct';
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

//Modales
import AddProductModal from '../modals/AddProductModal';
import UpdateProductModal from '../modals/UpdateProductModal';
import DetallesProductModal from '../modals/DetallesProductModal';

//Arreglo para las columnas
const ProductsColumns = [
    {
      accessorKey: "IdProdServOK",
      header: "ID PRODSERV OK",
      size: 30, //small column
    },
    {
      accessorKey: "IdProdServBK",
      header: "ID PRODSERV BK",
      size: 30, //small column
    },
    {
      accessorKey: "DesProdServ",
      header: "DES PRODUCTO SERV",
      size: 150, //small column
    },
    {
      accessorKey: "Indice",
      header: "INDICE",
      size: 50, //small column
    },
    {
      accessorKey: "CodigoBarras",
      header: "CÓDIGO DE BARRAS",
      size: 30, //small column
    }
  ];
 
  const ProductsTable = ({setDatosSeleccionados, datosSeleccionados}) => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const [AddProductShowModal, setAddProductShowModal] = useState(false);
    const [UpdateProductShowModal, setUpdateProductShowModal] = useState(false);
    const [DetallesProductShowModal, setDetallesProductShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchData = async () => {
      setLoadingTable(true);
      try {
          const AllProductsData = await getAllProducts();
          setProductsData(AllProductsData);
      } catch (error) {
          console.error("Error al obtener productos:", error);
      }
      setLoadingTable(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
      // Accede a los datos necesarios del registro (rowData) y llama a tu método
      const {IdProdServOK} = rowData.original;
      // Mostrar en consola los datos del registro
      console.log("IdProdServOK: ", IdProdServOK);
      // Actualizar el estado de los datos seleccionados
      setDatosSeleccionados({IdProdServOK});
      setSelectedProduct(rowData.original);
    };

    
    const handleEditClick = (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para editar.");
          return;
      }
      const product = selectedRows[0]?.original; //Información del proudcto seleccionado
      setSelectedProduct(product);
      setUpdateProductShowModal(true);
    };

    //Función para manejar la lógica de eliminar un producto
    const handleDelClick = async (table) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      if (selectedRows.length === 0) {
          alert("Selecciona una fila para borrar");
          return;
      }
      // console.log(selectedRows)
      // console.log(selectedRows[0]?.original)
      const product = selectedRows[0]?.original;
      // console.log(product[Object.keys(product)[1]])
      const IdProdServOK = product[Object.keys(product)[1]];

    await delOneProduct(IdProdServOK);
    await fetchData();
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
                        <IconButton onClick={() => setAddProductShowModal(true)}>
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
                        <IconButton onClick={() => setDetallesProductShowModal(true)}>
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
        <Dialog open={AddProductShowModal}>
            <AddProductModal
              AddProductShowModal={AddProductShowModal}
              setAddProductShowModal={setAddProductShowModal}
              onClose={() => setAddProductShowModal(false)}
              onProductAdded={fetchData}
            />
        </Dialog>

        <Dialog open={UpdateProductShowModal}>
          <UpdateProductModal
            UpdateProductShowModal={UpdateProductShowModal}
            setUpdateProductShowModal={setUpdateProductShowModal}
            onClose={() => setUpdateProductShowModal(false)}
            productData={selectedProduct}
            onProductUpdated={fetchData}
          />
        </Dialog> 

        <Dialog open={DetallesProductShowModal}>
          <DetallesProductModal 
            DetallesProductShowModal={DetallesProductShowModal}
            setDetallesProductShowModal={setDetallesProductShowModal}
            productData={selectedProduct}
          />
        </Dialog>
        </Box>
      );
  };

  export default ProductsTable;
   