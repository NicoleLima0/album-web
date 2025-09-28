import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Transition } from "../../contexts/transition";

function ModalAlert({ open, title, text, onConfirm, onCancel }) {
  
    return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={() => {
        onCancel();
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onConfirm();
          }}
        >
          Concluir
        </Button>
        <Button
          onClick={() => {
            onCancel();
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalAlert;
