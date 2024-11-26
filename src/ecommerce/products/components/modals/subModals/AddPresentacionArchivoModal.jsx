import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, TextField, Box, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

import {ArchivosValues} from '../../../helpers/PresentacionesArchivosValues'
import {AddOnePresentacionSubdocument} from '../../../services/remote/post/AddOnePresentacionSubdocument'

const AddPresentacionArchivoModal = ({ addPresentacionArchivoShowModal, setAddPresentacionArchivoShowModal, onPresentacionArchivoAdded, idProd, idPres }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Instancia de formik para la configuración de formularios
    const formik = useFormik({
        initialValues: {
            IdArchivoOK: "",
            IdArchivoBK: "",
            DesArchivo: "",
            RutaArchivo: "",
            Path: "",
            IdTipoArchivoOK: "",
            IdTipoSeccionOK: "",
            Secuencia: "",
            Principal: "",
        },
        validationSchema: Yup.object({
            IdArchivoOK: Yup.string().required("Campo requerido"),
            IdArchivoBK: Yup.string().required("Campo requerido"),
            DesArchivo: Yup.string().required("Campo requerido"),
            RutaArchivo: Yup.string().required("Campo requerido"),
            Path: Yup.string().required("Campo requerido"),
            IdTipoArchivoOK: Yup.string().required("Campo requerido"),
            IdTipoSeccionOK: Yup.string().required("Campo requerido"),
            Secuencia: Yup.number().required("Campo requerido"),
            Principal: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log("Entro al onSubmit despues de hacer click en botón Guardar");
            //Reiniciamos los estados de las alertas de exito y error.
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                const Archivo = ArchivosValues(values);
                await AddOnePresentacionSubdocument (idProd, idPres,'archivos', Archivo)
                setMensajeExitoAlert("Archivo guardado correctamente");
                onPresentacionArchivoAdded();
            } catch (error) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo guardar el archivo");
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
          open={addPresentacionArchivoShowModal}
          onClose={() => setAddPresentacionArchivoShowModal(false)}
          fullWidth
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>
              <Typography component="h6">
                <strong>Agregar Nuevo Archivo</strong>
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column" }}
              dividers
            >
              {/* Campos de captura */}
              <TextField
                id="IdArchivoOK"
                label="IdArchivoOK*"
                value={formik.values.IdArchivoOK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdArchivoOK && Boolean(formik.errors.IdArchivoOK)
                }
                helperText={
                  formik.touched.IdArchivoOK && formik.errors.IdArchivoOK
                }
              />
              <TextField
                id="IdArchivoBK"
                label="IdArchivoBK*"
                value={formik.values.IdArchivoBK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdArchivoBK && Boolean(formik.errors.IdArchivoBK)
                }
                helperText={
                  formik.touched.IdArchivoBK && formik.errors.IdArchivoBK
                }
              />
              <TextField
                id="DesArchivo"
                label="DesArchivo*"
                value={formik.values.DesArchivo}
                {...commonTextFieldProps}
                error={
                  formik.touched.DesArchivo && Boolean(formik.errors.DesArchivo)
                }
                helperText={formik.touched.DesArchivo && formik.errors.DesArchivo}
              />
              <TextField
                id="RutaArchivo"
                label="RutaArchivo*"
                value={formik.values.RutaArchivo}
                {...commonTextFieldProps}
                error={
                  formik.touched.RutaArchivo && Boolean(formik.errors.RutaArchivo)
                }
                helperText={formik.touched.RutaArchivo && formik.errors.RutaArchivo}
              />
              <TextField
                id="Path"
                label="Path*"
                value={formik.values.Path}
                {...commonTextFieldProps}
                error={
                  formik.touched.Path && Boolean(formik.errors.Path)
                }
                helperText={formik.touched.Path && formik.errors.Path}
              />
              <TextField
                id="IdTipoArchivoOK"
                label="IdTipoArchivoOK*"
                value={formik.values.IdTipoArchivoOK}
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoArchivoOK && Boolean(formik.errors.IdTipoArchivoOK)
                }
                helperText={formik.touched.IdTipoArchivoOK && formik.errors.IdTipoArchivoOK}
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
                onClick={() => setAddPresentacionArchivoShowModal(false)}
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
                onClick={() => setAddPresentacionArchivoShowModal(false)}
                loading={Loading}
              >
                <span>GUARDAR</span>
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      );
}
export default AddPresentacionArchivoModal;