import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    maxWidth: "500px", 
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    justifyContent: "center", 
  },
}));

function ModalNewAlbum({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleConclude = () => {
    // Adicione aqui a lógica para salvar o novo álbum
    console.log("Salvando novo álbum...");
    handleClose();
  };

  return (
    <>
       <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="modal-new-album-container"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Criar novo álbum
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <X size={20} />
        </IconButton>
        <DialogContent dividers className="modal-content-form">
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            fullWidth
            multiline
            rows={4} 
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="conclude-button"
            variant="contained"
            onClick={handleConclude}
            sx={{ textTransform: 'none' }}
          >
            Concluir
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default ModalNewAlbum;
