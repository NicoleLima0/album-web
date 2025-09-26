import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { X } from "lucide-react";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { albunsKey } from "../../constants/defaultValues";

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

function ModalNewAlbum({ open, setOpen, setItemData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleConclude = () => {
    const payload = {
      id: Math.floor(Math.random() * 10000) + 1,
      title: title,
      description: description,
    };

    const existingAlbuns = localStorage.getItem(albunsKey);

    let albuns = [];

    if (existingAlbuns) {
      try {
        const parsedAlbuns = JSON.parse(existingAlbuns);

        if (Array.isArray(parsedAlbuns)) {
          albuns = parsedAlbuns;
        } else {
          albuns = [parsedAlbuns];
        }
      } catch (error) {
        console.error("Erro ao analisar os dados do localStorage:", error);
        albuns = [];
      }
    }
    albuns.push(payload);

    setItemData((prevItemData) => [...prevItemData, payload]);
    localStorage.setItem(albunsKey, JSON.stringify(albuns));

   
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
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleConclude();
          }}
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
              Concluir
            </Button>
          </DialogActions>
        </Box>
      </BootstrapDialog>
    </>
  );
}

export default ModalNewAlbum;
