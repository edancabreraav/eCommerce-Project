import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, TextField, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

import {InfoVtaValues} from '../../../helpers/PresentacionInfoVtaValues'
import {UpdateOnePresentacionSubdocument} from '../../../services/remote/put/UpdateOnePresentacionSubdocument'

const UpdatePresentacionInfoVtaModal = ({ updatePresentacionInfoVtaShowModal, setUpdatePresentacionInfoVtaShowModal, onPresentacionInfoVtaUpdated, idProd, idPres, infovtaData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Instancia de formik para la configuración de formularios
    const formik = useFormik({
        initialValues: {
            IdEtiquetaOK: infovtaData.IdEtiquetaOK || "",
            IdEtiqueta: infovtaData.IdEtiqueta || "",
            Valor: infovtaData.Valor || "",
            IdTipoSeccionOK: infovtaData.IdTipoSeccionOK || "",
            Secuencia: infovtaData.Secuencia || "",
        },
        validationSchema: Yup.object({
          IdEtiquetaOK: Yup.string().required("Campo requerido"),
          IdEtiqueta: Yup.string().required("Campo requerido"),
          Valor: Yup.string().required("Campo requerido"),
          IdTipoSeccionOK: Yup.string().required("Campo requerido"),
          Secuencia: Yup.string().required("Campo requerido")
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log("Entro al onSubmit despues de hacer click en botón Guardar");
            //Reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const InfoVta = InfoVtaValues(values);
                await UpdateOnePresentacionSubdocument (idProd, idPres,'info_vta', InfoVta.IdEtiquetaOK, InfoVta)
                setMensajeExitoAlert("Info_vta actualizada correctamente");
                onPresentacionInfoVtaUpdated();
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar la información");
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
          open={updatePresentacionInfoVtaShowModal}
          onClose={() => setUpdatePresentacionInfoVtaShowModal(false)}
          fullWidth
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
              <Typography component="h6">
                <strong>Actualizar Información de venta</strong>
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column" }}
              dividers
            >
              {/* Campos de captura */}
              <TextField
                id="IdEtiquetaOK"
                label="IdEtiquetaOK*"
                value={formik.values.IdEtiquetaOK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdEtiquetaOK && Boolean(formik.errors.IdEtiquetaOK)
                }
                helperText={
                  formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK
                }
                disabled
              />
              <TextField
                id="IdEtiqueta"
                label="IdEtiqueta*"
                value={formik.values.IdEtiqueta}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdEtiqueta && Boolean(formik.errors.IdEtiqueta)
                }
                helperText={
                  formik.touched.IdEtiqueta && formik.errors.IdEtiqueta
                }
              />
              <TextField
                id="Valor"
                label="Valor*"
                value={formik.values.Valor}
                {...commonTextFieldProps}
                error={
                  formik.touched.Valor && Boolean(formik.errors.Valor)
                }
                helperText={formik.touched.Valor && formik.errors.Valor}
              />
              <TextField
                id="IdTipoSeccionOK"
                label="IdTipoSeccionOK*"
                value={formik.values.IdTipoSeccionOK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoSeccionOK && Boolean(formik.errors.IdTipoSeccionOK)
                }
                helperText={formik.touched.IdTipoSeccionOK && formik.errors.IdTipoSeccionOK}
              />
              <TextField
                id="Secuencia"
                label="Secuencia*"
                value={formik.values.Secuencia}
                {...commonTextFieldProps}
                error={
                  formik.touched.Secuencia && Boolean(formik.errors.Secuencia)
                }
                helperText={formik.touched.Secuencia && formik.errors.Secuencia}
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
                onClick={() => setUpdatePresentacionInfoVtaShowModal(false)}
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
                onClick={() => setUpdatePresentacionInfoVtaShowModal(false)}
                loading={Loading}
              >
                <span>GUARDAR</span>
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      );
}
export default UpdatePresentacionInfoVtaModal;