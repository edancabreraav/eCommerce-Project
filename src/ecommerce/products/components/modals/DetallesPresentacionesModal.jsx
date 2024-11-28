import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, Grid2, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const DetallesPresentacionesModal = ({ detallesPresentacionesShowModal, setDetallesPresentacionesShowModal, presentacionData }) => {

    return (
        <Dialog
          open={detallesPresentacionesShowModal}
          onClose={() => setDetallesPresentacionesShowModal(false)}
          fullWidth
        >
          <DialogTitle>
              <Typography component="h6">
                <strong>Información de Presentaciones</strong>
              </Typography>
          </DialogTitle>

          <DialogContent dividers>
            <Box>
                <Grid2 container spacing={2} columnSpacing={6}>
                  
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        ID Presentación:
                        </Typography>
                        <Typography variant="body1">{presentacionData?.IdPresentaOK || "N/A"}</Typography>
                    </Grid2>
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        ID Presentación BK:
                        </Typography>
                        <Typography variant="body1">{presentacionData?.IdPresentaBK || "N/A"}</Typography>
                    </Grid2>

                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        Código de Barras:
                        </Typography>
                        <Typography variant="body1">{presentacionData?.CodigoBarras || "N/A"}</Typography>
                    </Grid2>
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        Descripción:
                        </Typography>
                        <Typography variant="body1">{presentacionData?.DesPresenta || "N/A"}</Typography>
                    </Grid2>

                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        Índice:
                        </Typography>
                        <Typography variant="body1">{presentacionData?.Indice || "N/A"}</Typography>
                    </Grid2>
                    <Grid2 item xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                        Principal:
                        </Typography>
                        <Typography variant="body1">{presentacionData?.Principal || "N/A"}</Typography>
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
              onClick={() => setDetallesPresentacionesShowModal(false)}
            >
              <span>CERRAR</span>
            </LoadingButton>
          </DialogActions>
              
        </Dialog>
      );
}
export default DetallesPresentacionesModal;