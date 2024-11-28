import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, Grid2, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const DetallesInfoAdModal = ({ DetallesInfoAdShowModal, setDetallesInfoAdShowModal, infoAdData }) => {
    
    return (
        <Dialog
          open={DetallesInfoAdShowModal}
          onClose={() => setDetallesInfoAdShowModal(false)}
          fullWidth
        >
          <DialogTitle>
              <Typography component="h6">
                <strong>Detalles de Información Adicional</strong>
              </Typography>
          </DialogTitle>

          <DialogContent dividers>
            <Box>
                <Grid2 container spacing={2} columnSpacing={10}>
 
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        ID Etiqueta:
                        </Typography>
                        <Typography variant="body1">{infoAdData?.IdEtiqueta || "N/A"}</Typography>
                    </Grid2>
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        Valor:
                        </Typography>
                        <Typography variant="body1">{infoAdData?.Valor || "N/A"}</Typography>
                    </Grid2>

                    {/* Línea 2 */}
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        Tipo Sección ID:
                        </Typography>
                        <Typography variant="body1">{infoAdData?.IdTipoSeccionOK || "N/A"}</Typography>
                    </Grid2>
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        Secuencia:
                        </Typography>
                        <Typography variant="body1">{infoAdData?.Secuencia || "N/A"}</Typography>
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
              onClick={() => setDetallesInfoAdShowModal(false)}
            >
              <span>CERRAR</span>
            </LoadingButton>
          </DialogActions>
              
        </Dialog>
      );
}
export default DetallesInfoAdModal;