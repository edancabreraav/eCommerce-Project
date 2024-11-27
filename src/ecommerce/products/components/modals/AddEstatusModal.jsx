import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, TextField, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

import {EstatusValues} from '../../helpers/EstatusValues'
import {AddOneSubdocument} from '../../services/remote/post/AddOneSubdocument'

const AddEstatusModal = ({ addEstatusShowModal, setAddEstatusShowModal, onEstatusAdded, idProd }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Instancia de formik para la configuración de formularios
    const formik = useFormik({
        initialValues: {
          IdTipoEstatusOK: "",
          Actual: "",
          Observacion: "",
        },
        validationSchema: Yup.object({
          IdTipoEstatusOK: Yup.string().required("Campo requerido"),
          Actual: Yup.string().required("Campo requerido"),
          Observacion: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log("Entro al onSubmit despues de hacer click en botón Guardar");
            //Reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const Estatus = EstatusValues(values);
                await AddOneSubdocument (idProd,'estatus', Estatus)
                setMensajeExitoAlert("Estatus creado y guardado correctamente");
                onEstatusAdded();
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
    return (
        <Dialog
          open={addEstatusShowModal}
          onClose={() => setAddEstatusShowModal(false)}
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
              />
              <TextField
                id="Actual"
                label="Actual*"
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
                onClick={() => setAddEstatusShowModal(false)}
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
                onClick={() => setAddEstatusShowModal(false)}
                loading={Loading}
              >
                <span>GUARDAR</span>
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      );
}
export default AddEstatusModal;