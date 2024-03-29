import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  delete_basket_by_basketId,
  get_basket_by_userId,
} from "../../redux/action/BasketAction";
import { connect } from "react-redux";

function AlertDialog({
  open,
  setOpen,
  basketId,
  delete_basket_by_basketId,
  get_basket_by_userId,
}) {
  const handleSubmit = () => {
    delete_basket_by_basketId({
      basketId: basketId,
      after: get_basket_by_userId,
    });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You sure you want to Delete this basket.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default connect(null, {
  delete_basket_by_basketId,
  get_basket_by_userId,
})(AlertDialog);
