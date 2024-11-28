import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, TextField, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

import {PresentacionEstatusValues} from '../../../helpers/PresentacionEstatusValues'
import {UpdateOnePresentacionSubdocument} from '../../../services/remote/put/UpdateOnePresentacionSubdocument'

const UpdatePresentacionEstatusModal = ({ updatePresentacionEstatusShowModal, setUpdatePresentacionEstatusShowModal, onPresentacionEstatusUpdated, idProd, idPres, estatusData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Instancia de formik para la configuración de formularios
    const formik = useFormik({
        initialValues: {
            IdTipoEstatusOK: estatusData.IdTipoEstatusOK || "",
            Actual: estatusData.Actual || "",
            Observacion: estatusData.Observacion || "",
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
                await UpdateOnePresentacionSubdocument (idProd, idPres,'estatus', Estatus.IdTipoEstatusOK, Estatus)
                setMensajeExitoAlert("Estatus actualizado correctamente");
                setTimeout(() => { //Timeout para alcanzar a visualizar el mensaje de éxito
                  setUpdatePresentacionEstatusShowModal(false); // Cerrar el modal después del retraso
                  onPresentacionEstatusUpdated(); // Actualizar tabla
                }, 2000);
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar el Estatus");
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
          open={updatePresentacionEstatusShowModal}
          onClose={() => setUpdatePresentacionEstatusShowModal(false)}
          fullWidth
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
              <Typography component="h6">
                <strong>Actualizar Estatus</strong>
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column" }}
              dividers
            >
              {/* Campos de captura */}
              <TextField
                id="IdTipoEstatusOK"
                label="IdTipoEstatusOK*"
                value={formik.values.IdTipoEstatusOK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoEstatusOK && Boolean(formik.errors.IdTipoEstatusOK)
                }
                helperText={
                  formik.touched.IdTipoEstatusOK && formik.errors.IdTipoEstatusOK
                }
                disabled
              />
              <TextField
                id="Actual"
                label="Actual*"
                disabled
                value={formik.values.Actual}
                {...commonTextFieldProps}
                error={
                  formik.touched.Actual && Boolean(formik.errors.Actual)
                }
                helperText={
                  formik.touched.Actual && formik.errors.Actual
                }
              />
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
                onClick={() => setUpdatePresentacionEstatusShowModal(false)}
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
export default UpdatePresentacionEstatusModal;