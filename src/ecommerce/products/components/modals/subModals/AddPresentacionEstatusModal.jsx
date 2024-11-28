import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, TextField, Box, Alert, Select, MenuItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

import {PresentacionEstatusValues} from '../../../helpers/PresentacionEstatusValues'
import {AddOnePresentacionSubdocument} from '../../../services/remote/post/AddOnePresentacionSubdocument'
import { getOneProduct } from "../../../services/remote/get/getOneProduct";

const AddPresentacionEstatusModal = ({ addPresentacionEstatusShowModal, setAddPresentacionEstatusShowModal, onPresentacionEstatusAdded, idProd, idPres }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);
    const [opciones, setOpciones] = useState([]);

    //Instancia de formik para la configuración de formularios
    const formik = useFormik({
        initialValues: {
          IdTipoEstatusOK: "",
          Actual: "",
          Observacion: "",
        },
        validationSchema: Yup.object({
          IdTipoEstatusOK:  Yup.string().required("Campo requerido") // Solo letras, guión y mas letras, sin espacios
                                        .matches(/^[a-zA-Z]+-[a-zA-Z]+$/,
                                                  'Solo se permiten letras, seguidas de un guión y terminar en letras'),
                                                  
          Observacion: Yup.string(), //String, pero puede estar vacio
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log("Entro al onSubmit despues de hacer click en botón Guardar");
            //Reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const Estatus = PresentacionEstatusValues(values);
                await AddOnePresentacionSubdocument (idProd, idPres,'estatus', Estatus)
                setMensajeExitoAlert("Estatus creado y guardado correctamente");
                setTimeout(() => { //Timeout para alcanzar a visualizar el mensaje de éxito
                  setAddPresentacionEstatusShowModal(false); // Cerrar el modal después del retraso
                  onPresentacionEstatusAdded(); // Actualizar tabla
                }, 2000);
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Estatus");
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

    const fetchOpciones = async (idProd) => {
      try {
        const response = await getOneProduct(idProd);
        setOpciones(response.estatus);
      } catch (error) {
        console.error("Error obteniendo opciones: ", error);
      }
  };

  useEffect(() => {
    fetchOpciones(idProd);
  }, [idProd]);

    return (
        <Dialog
          open={addPresentacionEstatusShowModal}
          onClose={() => setAddPresentacionEstatusShowModal(false)}
          fullWidth
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
              <Typography component="h6">
                <strong>Agregar Nuevo Estatus</strong>
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column" }}
              dividers
            >
              {/* Campos de captura */}
              
              <Select
                id="IdTipoEstatusOK"
                value={formik.values.IdTipoEstatusOK || ""}
                onChange={ (event) => formik.setFieldValue("IdTipoEstatusOK", event.target.value) }
                fullWidth
                displayEmpty
                error={
                    formik.touched.IdTipoEstatusOK &&
                    Boolean(formik.errors.IdTipoEstatusOK)
                }>
                <MenuItem value="" disabled>
                    Seleccione una opción
                </MenuItem>
                {opciones.map((opcion) => (
                    <MenuItem 
                        key={opcion.IdTipoEstatusOK} 
                        value={opcion.IdTipoEstatusOK}>
                        {opcion.IdTipoEstatusOK}
                    </MenuItem>
                ))}
              </Select>

              <TextField
                id="Observacion"
                label="Observacion*"
                value={formik.values.Observacion}
                {...commonTextFieldProps}
                error={
                  formik.touched.Observacion && Boolean(formik.errors.Observacion)
                }
                helperText={formik.touched.Observacion && formik.errors.Observacion}
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
                onClick={() => setAddPresentacionEstatusShowModal(false)}
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
}
export default AddPresentacionEstatusModal;