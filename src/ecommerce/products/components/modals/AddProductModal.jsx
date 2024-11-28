import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, TextField, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import {ProductsValues} from '../../helpers/ProductsValues';
import {AddOneProduct} from '../../services/remote/post/AddOneProudct'

const AddProductModal = ({ AddProductShowModal, setAddProductShowModal, onProductAdded }) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  //Instancia de formik para la configuración de formularios
  const formik = useFormik({
    initialValues: {
      IdProdServOK: "",
      IdProdServBK: "",
      DesProdServ: "",
      CodigoBarras: "",
      Indice: "",
    },
    validationSchema: Yup.object({
      IdProdServOK: Yup.string().required("Campo requerido") // String pero sin espación, no puede terminar en '-' tampoco
                                .matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
                                          'Solo se permiten caracteres alfanuméricos y el simbolo "-"'),

      IdProdServBK: Yup.string().required("Campo requerido") // Letras y números
                                .matches(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)$/,
                                          'Solo se permiten caracteres alfanuméricos y el simbolo "-"'),

      DesProdServ: Yup.string().required("Campo requerido"), // Juego libre, con que sea String, y ni eso, puede ser nada

      CodigoBarras: Yup.string().required("Campo requerido") // Solo números
                                .matches(/^\d{13}$/, 
                                          'Debe contener exactamente 13 dígitos'),

      Indice: Yup.string().required("Campo requerido") // String pero sin espación, no puede terminar en '-' tampoco
                          .matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
                                    'Solo se permiten caracteres alfanuméricos y el simbolo "-"'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      console.log("Entro al onSubmit despues de hacer click en botón Guardar");
      //Reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Product = ProductsValues(values);
        await AddOneProduct(Product)
        setMensajeExitoAlert("Producto creado y guardado correctamente");
        setTimeout(() => { //Timeout para alcanzar a visualizar el mensaje de éxito
          setAddProductShowModal(false); // Cerrar el modal después del retraso
          onProductAdded(); // Actualizar lista de productos
        }, 2000);
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Producto");
      }
      setLoading(false);
    },
  });

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={AddProductShowModal}
      onClose={() => setAddProductShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Producto</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* Campos de captura */}
          <TextField
            id="IdProdServOK"
            label="IdProdServOK*"
            value={formik.values.IdProdServOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdProdServOK && Boolean(formik.errors.IdProdServOK)
            }
            helperText={
              formik.touched.IdProdServOK && formik.errors.IdProdServOK
            }
          />
          <TextField
            id="IdProdServBK"
            label="IdProdServBK*"
            value={formik.values.IdProdServBK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdProdServBK && Boolean(formik.errors.IdProdServBK)
            }
            helperText={
              formik.touched.IdProdServBK && formik.errors.IdProdServBK
            }
          />
          <TextField
            id="DesProdServ"
            label="Descripción*"
            value={formik.values.DesProdServ}
            {...commonTextFieldProps}
            error={
              formik.touched.DesProdServ && Boolean(formik.errors.DesProdServ)
            }
            helperText={formik.touched.DesProdServ && formik.errors.DesProdServ}
          />
          <TextField
            id="CodigoBarras"
            label="Código de barras*"
            value={formik.values.CodigoBarras}
            {...commonTextFieldProps}
            error={
              formik.touched.CodigoBarras && Boolean(formik.errors.CodigoBarras)
            }
            helperText={
              formik.touched.CodigoBarras && formik.errors.CodigoBarras
            }
          />
          <TextField
            id="Indice"
            label="Indice*"
            value={formik.values.Indice}
            {...commonTextFieldProps}
            error={formik.touched.Indice && Boolean(formik.errors.Indice)}
            helperText={formik.touched.Indice && formik.errors.Indice}
          />
        </DialogContent>
        {/* Acciones de usuario */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
            {/*Alertas de éxito y error*/}
          <Box m="auto">
            {console.log("mensajeExitoAlert", mensajeExitoAlert)}
            {console.log("mensajeErrorAlert", mensajeErrorAlert)}
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          {/* Boton de Cerrar */}
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setAddProductShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {/* Boton de Guardar */}
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={!!mensajeExitoAlert}
            loading={Loading}
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default AddProductModal;
