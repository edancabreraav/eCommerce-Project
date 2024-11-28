import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, Grid2, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const DetallesPresentacionInfoVtaModal = ({ detallesPresentacionInfoVtaShowModal, setDetallesPresentacionInfoVtaShowModal, presentacionInfoVtaData }) => {
    
    return (
        <Dialog
          open={detallesPresentacionInfoVtaShowModal}
          onClose={() => setDetallesPresentacionInfoVtaShowModal(false)}
          fullWidth
        >
          <DialogTitle>
              <Typography component="h6">
                <strong>Información del PresentacionInfoVtao</strong>
              </Typography>
          </DialogTitle>

          <DialogContent dividers>
            <Box>
              <Grid2 container spacing={2} columnSpacing={15}>

                  <Grid2 item xs={6}> 
                    <Typography variant="subtitle2" color="textSecondary">
                      Id Etiqueta OK:
                    </Typography>
                    <Typography variant="body1">{presentacionInfoVtaData?.IdEtiquetaOK || "N/A"}</Typography>
                  </Grid2>

                  <Grid2 item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Id Etiqueta:
                    </Typography>
                    <Typography variant="body1">{presentacionInfoVtaData?.IdEtiqueta || "N/A"}</Typography>
                  </Grid2>

                <Grid2 item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Valor:
                  </Typography>
                  <Typography variant="body1">{presentacionInfoVtaData?.Valor || "N/A"}</Typography>
                </Grid2>

                <Grid2 item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Id Tipo Seccion OK:
                  </Typography>
                  <Typography variant="body1">{presentacionInfoVtaData?.IdTipoSeccionOK || "N/A"}</Typography>
                </Grid2>

                <Grid2 item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Secuencia:
                  </Typography>
                  <Typography variant="body1">{presentacionInfoVtaData?.Secuencia || "N/A"}</Typography>
                </Grid2>
              </Grid2>
            </Box>
          </DialogContent>

          <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
            {/* Boton de Cerrar */}
            <LoadingButton
              color="secondary"
              loadingPosition="start"
              startIcon={<CloseIcon />}
              variant="outlined"
              onClick={() => setDetallesPresentacionInfoVtaShowModal(false)}
            >
              <span>CERRAR</span>
            </LoadingButton>
          </DialogActions>
              
        </Dialog>
      );
}
export default DetallesPresentacionInfoVtaModal;