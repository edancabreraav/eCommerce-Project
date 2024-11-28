import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, Grid2, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

const DetallesProductModal = ({ DetallesProductShowModal, setDetallesProductShowModal, productData }) => {
    
    return (
        <Dialog
          open={DetallesProductShowModal}
          onClose={() => setDetallesProductShowModal(false)}
          fullWidth
        >
          <DialogTitle>
              <Typography component="h6">
                <strong>Información del Producto</strong>
              </Typography>
          </DialogTitle>

          <DialogContent dividers>
            <Box>
              <Grid2 container spacing={2} columnSpacing={15}>

                  <Grid2 item xs={6}> 
                    <Typography variant="subtitle2" color="textSecondary">
                      Id ProdServ OK:
                    </Typography>
                    <Typography variant="body1">{productData?.IdProdServOK || "N/A"}</Typography>
                  </Grid2>

                  <Grid2 item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Código de Barras:
                    </Typography>
                    <Typography variant="body1">{productData?.CodigoBarras || "N/A"}</Typography>
                  </Grid2>

                <Grid2 item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Descripción:
                  </Typography>
                  <Typography variant="body1">{productData?.DesProdServ || "N/A"}</Typography>
                </Grid2>

                <Grid2 item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Índice:
                  </Typography>
                  <Typography variant="body1">{productData?.Indice || "N/A"}</Typography>
                </Grid2>

                <Grid2 item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Descripción:
                  </Typography>
                  <Typography variant="body1">{productData?.DesProdServ || "N/A"}</Typography>
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
              onClick={() => setDetallesProductShowModal(false)}
            >
              <span>CERRAR</span>
            </LoadingButton>
          </DialogActions>
              
        </Dialog>
      );
}
export default DetallesProductModal;