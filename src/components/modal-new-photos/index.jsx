import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { photosKey } from "../../constants/defaultValues";
import { Transition } from "../../contexts/transition";

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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ModalNewPhotos({ open, setOpen, setPhotos }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [color, setColor] = useState("");
  const { albumId } = useParams();

  const handleClose = () => {
    setOpen(false);
    setImage(null);
    setTitle("");
    setDescription("");
    setDate("");
    setColor("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      albumId: Number(albumId),
      imageId: Math.floor(Math.random() * 10000) + 1,
      image: image,
      title: title,
      color: color,
      description: description,
      date: date,
    };
    const existingPhotos = localStorage.getItem(photosKey);

    let photos = [];

    if (existingPhotos) {
      try {
        const parsedAlbuns = JSON.parse(existingPhotos);

        if (Array.isArray(parsedAlbuns)) {
          photos = parsedAlbuns;
        } else {
          photos = [parsedAlbuns];
        }
      } catch (error) {
        console.error("Erro ao analisar os dados do localStorage:", error);
        photos = [];
      }
    }
    photos.push(payload);

    setPhotos((prevItemData) => [...prevItemData, payload]);
    localStorage.setItem(photosKey, JSON.stringify(photos));

    handleClose();
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

        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent dividers className="modal-content">
            <Box className="form-field file-input-wrapper">
              <Button
                className="btn-upload"
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<Upload />}
              >
                Escolher foto
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      const blobUrl = URL.createObjectURL(file);
                      setImage(blobUrl);
                    }
                  }}
                />
              </Button>
              {image ? <img className="image-photo" src={image} /> : <></>}
            </Box>

            <TextField
              label="Título"
              required
              variant="outlined"
              fullWidth
              className="form-field"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              label="Descrição"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              className="form-field"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              label="Data/Hora de aquisição"
              type="datetime-local"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              className="form-field"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <TextField
              label="Cor predominante"
              variant="outlined"
              fullWidth
              className="form-field"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
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
