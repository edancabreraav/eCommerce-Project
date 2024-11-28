import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, Box, Grid2 } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const DetallesPresentacionArchivoModal = ({ detallesPresentacionArchivoShowModal, setDetallesPresentacionArchivoShowModal, presentacionArchivoData }) => {
  
    return (
    <Dialog
      open={detallesPresentacionArchivoShowModal}
      onClose={() => setDetallesPresentacionArchivoShowModal(false)}
      fullWidth
    >
      <DialogTitle>
        <Typography component="h6">
          <strong>Información de la Presentación - Archivo</strong>
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box>
          
          <Grid2 container spacing={2} columnSpacing={15}>
            
            <Grid2 item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                ID Archivo OK:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.IdArchivoOK || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                ID Archivo BK:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.IdArchivoBK || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Descripción del Archivo:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.DesArchivo || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Ruta del Archivo:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.RutaArchivo || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Path:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.Path || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                ID Tipo Archivo OK:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.IdTipoArchivoOK || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                ID Tipo Sección OK:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.IdTipoSeccionOK || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Secuencia:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.Secuencia || "N/A"}</Typography>
            </Grid2>

            <Grid2 item xs={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Principal:
              </Typography>
              <Typography variant="body1">{presentacionArchivoData?.Principal || "N/A"}</Typography>
            </Grid2>
          </Grid2>
        </Box>
      </DialogContent>

      <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
        {/* Botón de Cerrar */}
        <LoadingButton
          color="secondary"
          loadingPosition="start"
          startIcon={<CloseIcon />}
          variant="outlined"
          onClick={() => setDetallesPresentacionArchivoShowModal(false)}
        >
          <span>CERRAR</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DetallesPresentacionArchivoModal;
