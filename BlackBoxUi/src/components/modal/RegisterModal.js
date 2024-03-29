import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import img from "../../assets/images/otp.png";
import { useNavigate } from "react-router-dom";
import { primary_colors } from "../../controller/colors";
import { RegisterUser } from "../../redux/action/AutenticationActions";
import { connect } from "react-redux";

const RegisterModal = ({
  open,
  handleClose,
  userDetails,
  RegisterUser,
  setUserDetails,
}) => {
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "75%",
    borderRadius: 5,
  };
  const handleSubmit = async () => {
    RegisterUser(userDetails, after);
  };
  const after = () => {
    setUserDetails("");
    navigate("/");
    handleClose();
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Box sx={{ position: "absolute", left: 30, top: 20 }}>
            <AiOutlineClose
              size={25}
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Box>

          <Grid
            container
            padding={10}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid
              item
              xl={6}
              lg={7}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "600" }}>
                Enter Verification Code
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  variant="subtitle1"
                  color={primary_colors.black}
                  sx={{ mb: 1, fontWeight: 500 }}
                >
                  we have sent a Verification code to
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={primary_colors.blue}
                  sx={{ mb: 1, fontWeight: 500 }}
                >
                  {userDetails.userContactNumber}
                </Typography>
              </Box>
              <Stack
                display="flex"
                flexDirection={"row"}
                // spacing={2}
              >
                <TextField sx={{ width: 60, mx: 2 }} />
                <TextField sx={{ width: 60, mx: 2 }} />
                <TextField sx={{ width: 60, mx: 2 }} />
                <TextField sx={{ width: 60, mx: 2 }} />
              </Stack>
              <Box m={1} />
              <Link>
                <Typography variant="subtitle2">Send the code again</Typography>
              </Link>
              <Box m={0.5} />
              <Link>
                <Typography variant="subtitle2">change phone number</Typography>
              </Link>
              <Box m={1} />
              <Button
                size="large"
                sx={{ mb: 2, width: 150, bgcolor: primary_colors.blue }}
                variant="contained"
                onClick={handleSubmit}
              >
                verify
              </Button>
            </Grid>
            <Grid
              item
              xl={6}
              lg={5}
              md={12}
              sm={12}
              xs={12}
              sx={{ display: { xs: "none", sm: "block", md: "block" } }}
            >
              <img style={{ width: "100%" }} src={img} alt={"icon"} />
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};

export default connect(null, { RegisterUser })(RegisterModal);
