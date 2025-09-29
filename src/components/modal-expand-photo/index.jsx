import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function ModalExpandPhoto({ open, setOpen, imageExpand, setImageExpand }) {
  return (
    <Dialog
      className="modal-expand-photo"
      onClose={() => {
        setOpen(false);
        setImageExpand({});
      }}
      open={open}
    >
      <DialogTitle>{imageExpand?.title}</DialogTitle>
      <DialogContent>
        <img src={imageExpand?.image} />
        <div className="mt-1">{imageExpand?.description}</div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalExpandPhoto;
