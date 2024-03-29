import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider } from "@mui/material";
import { useState } from "react";
import InputField from "../elements/InputField";

import {
  create_basket,
  get_basket_by_userId,
  update_basket_by_basketId,
} from "../../redux/action/BasketAction";
import { connect } from "react-redux";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  borderRadius: 2,
  bgcolor: "#25242D",
  boxShadow: 24,
  py: 2,
};

function CreateBasket({
  open,
  handleClose,
  create_basket,
  get_basket_by_userId,
  updateBasket,
  update_basket_by_basketId,
}) {
  const [basketName, setBasketName] = useState("");
  let handleChange = (e) => {
    setBasketName(e.target.value);
  };
  let handleSubmit = async () => {
    if (updateBasket) {
      const process = await update_basket_by_basketId({
        updatedBasketData: { ...updateBasket, basketName: basketName },
        after: get_basket_by_userId,
      });
      if (process) {
        handleClose();
      }
    } else {
      const process = await create_basket({
        baskerDetails: {
          basketName: basketName,
          userId: 1,
          deployed: false,
          shared: false,
        },
        after: get_basket_by_userId,
      });
      if (process) {
        handleClose();
      }
    }
  };
  useEffect(() => {
    if (updateBasket) {
      setBasketName(updateBasket.basketName);
    }
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={"white"}
            sx={{ px: 4, py: 1 }}
          >
            {updateBasket ? "Update Basket" : "Create Basket"}
          </Typography>
          <Divider sx={{ bgcolor: "gray" }} />
          <form>
            <Box sx={{ px: 4, py: 2 }}>
              <InputField
                label="basketName"
                variant="outlined"
                fullWidth
                value={basketName}
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                px: 4,
                py: 0.5,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "#E82E2E" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Box p={0.7} />
              <Button
                variant="contained"
                sx={{ bgcolor: "#2E6BE8" }}
                onClick={() => handleSubmit()}
              >
                {updateBasket ? "Update" : "Create"}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default connect(null, {
  create_basket,
  get_basket_by_userId,
  update_basket_by_basketId,
})(CreateBasket);