import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { X } from "lucide-react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "calc(100% - 32px)",
    margin: "16px",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      maxWidth: "600px",
      margin: "32px",
    },
  },
}));

function ModalNewPhotos({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Adicione aqui a lógica para enviar os dados do formulário
    console.log("Formulário enviado!");
    handleClose();
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="modal-header"
        >
          <Typography variant="h6" component="div">
            Adicionar novas fotos
          </Typography>
          <Button
            color="inherit"
            onClick={handleClose}
            className="close-button"
          >
            <X />
          </Button>
        </DialogTitle>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <DialogContent dividers className="modal-content">
            <Box className="form-field file-input-wrapper">
              <Button
                variant="contained"
                component="label"
                className="file-input-button"
              >
                Escolher arquivo...
                <input type="file" hidden />
              </Button>
            </Box>

            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              className="form-field"
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              className="form-field"
            />
            <TextField
              label="Data/Hora de aquisição"
              type="datetime-local"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              className="form-field"
            />
            <TextField
              label="Cor predominante"
              variant="outlined"
              fullWidth
              className="form-field"
            />
          </DialogContent>
          <DialogActions className="modal-actions">
            <Button type="submit" variant="contained" className="submit-button">
              Enviar
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
}

export default ModalNewPhotos;
