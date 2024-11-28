import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, TextField, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

import {PresentacionesValues} from '../../helpers/PresentacionesValues'
import {AddOneSubdocument} from '../../services/remote/post/AddOneSubdocument'

const AddPresentacionModal = ({ addPresentacionShowModal, setAddPresentacionShowModal, onPresentacionAdded, idProd }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Instancia de formik para la configuración de formularios
    const formik = useFormik({
        initialValues: {
            IdPresentaOK: "",
            IdPresentaBK: "",
            CodigoBarras: "",
            DesPresenta: "",
            Indice: "",
            Principal: "",
        },
        validationSchema: Yup.object({
            IdPresentaOK: Yup.string().required("Campo requerido"),
            IdPresentaBK: Yup.string().required("Campo requerido"),
            CodigoBarras: Yup.string().required("Campo requerido"),
            DesPresenta: Yup.string().required("Campo requerido"),
            Indice: Yup.string().required("Campo requerido"),
            Principal: Yup.string().required("Campo requerido"),
          
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log("Entro al onSubmit despues de hacer click en botón Guardar");
            //Reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const Presentacion = PresentacionesValues(values);
                await AddOneSubdocument (idProd,'presentaciones', Presentacion)
                setMensajeExitoAlert("Presentación creada y guardada correctamente");
                setTimeout(() => { //Timeout para alcanzar a visualizar el mensaje de éxito
                  setAddPresentacionShowModal(false); // Cerrar el modal después del retraso
                  onPresentacionAdded(); // Actualizar tabla
                }, 2000);
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo agregar la presentación");
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
          open={addPresentacionShowModal}
          onClose={() => setAddPresentacionShowModal(false)}
          fullWidth
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
              <Typography component="h6">
                <strong>Agregar Nueva Presentación</strong>
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column" }}
              dividers
            >
              {/* Campos de captura */}
              <TextField
                id="IdPresentaOK"
                label="IdPresentaOK*"
                value={formik.values.IdPresentaOK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdPresentaOK && Boolean(formik.errors.IdPresentaOK)
                }
                helperText={
                  formik.touched.IdPresentaOK && formik.errors.IdPresentaOK
                }
              />
              <TextField
                id="IdPresentaBK"
                label="IdPresentaBK*"
                value={formik.values.IdPresentaBK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdPresentaBK && Boolean(formik.errors.IdPresentaBK)
                }
                helperText={
                  formik.touched.IdPresentaBK && formik.errors.IdPresentaBK
                }
              />
              <TextField
                id="CodigoBarras"
                label="CodigoBarras*"
                value={formik.values.CodigoBarras}
                {...commonTextFieldProps}
                error={
                  formik.touched.CodigoBarras && Boolean(formik.errors.CodigoBarras)
                }
                helperText={formik.touched.CodigoBarras && formik.errors.CodigoBarras}
              />
              <TextField
                id="DesPresenta"
                label="DesPresenta*"
                value={formik.values.DesPresenta}
                {...commonTextFieldProps}
                error={
                  formik.touched.DesPresenta && Boolean(formik.errors.DesPresenta)
                }
                helperText={
                  formik.touched.DesPresenta && formik.errors.DesPresenta
                }
              />
              <TextField
                id="Indice"
                label="Indice*"
                value={formik.values.Indice}
                {...commonTextFieldProps}
                error={
                  formik.touched.Indice && Boolean(formik.errors.Indice)
                }
                helperText={
                  formik.touched.Indice && formik.errors.Indice
                }
              />
              <TextField
                id="Principal"
                label="Principal*"
                value={formik.values.Principal}
                {...commonTextFieldProps}
                error={
                  formik.touched.Principal && Boolean(formik.errors.Principal)
                }
                helperText={formik.touched.Principal && formik.errors.Principal}
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
                onClick={() => setAddPresentacionShowModal(false)}
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
export default AddPresentacionModal;