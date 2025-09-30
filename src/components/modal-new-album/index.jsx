import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";
import { Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Transition } from "../../contexts/transition";

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

function ModalNewAlbum({ open, setOpen, onSave, onClose, albumData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isEditing = !!albumData;

  useEffect(() => {
    if (isEditing) {
      setTitle(albumData.title || "");
      setDescription(albumData.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [albumData, open, isEditing]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { title, description };
    onSave(payload);
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        slots={{
          transition: Transition,
        }}
        className="modal-new-album-container"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {isEditing ? "Editar álbum" : "Criar novo álbum"}
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
        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <DialogContent dividers className="modal-content-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="description"
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              className="conclude-button"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              {isEditing ? "Salvar alterações" : "Concluir"}
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
}

export default ModalNewAlbum;
