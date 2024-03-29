import React, { useState } from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import RegisterModal from "../components/modal/RegisterModal";
import { primary_colors } from "../controller/colors";
import img from "../assets/images/Register_bg.jpg";
import FormInputField from "../components/elements/FormInputField";
import { emailFormat, mobileNumberFormat } from "../controller/common";
import { registerFormFields } from "../constant.js/inputdata";

function Register() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userContactNumber: "",
    userPassword: "",
    userEmail: "",
    password: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSignUp = async () => {
    handleOpen();
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "userName":
        return !value ? "* Required !!" : "";
      case "userEmail":
        return !value
          ? "* Required !!"
          : !emailFormat.test(value)
          ? "Invalid Email"
          : "";
      case "userContactNumber":
        return !value
          ? "* Required !!"
          : !mobileNumberFormat.test(value)
          ? "Invalid Email"
          : "";
      case "password":
      case "userPassword":
        return !value ? "* Required !!" : "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const errors = {};
    for (const fieldName in userDetails) {
      const value = userDetails[fieldName];
      const error = validateField(fieldName, value);
      if (error) {
        errors[fieldName] = error;
      }
    }
    if (userDetails.userPassword !== userDetails.password) {
      errors.userPassword = "Passwords don't match !!";
    }

    setErrorMessage(errors);
    if (Object.keys(errors).length === 0) {
      handleSignUp();
    }

    return Object.keys(errors).length === 0;
  };

  return (
    <Box
      sx={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 1)),url(${img})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: 3.5,
      }}
    >
      {open && (
        <RegisterModal
          open={open}
          handleClose={handleClose}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}
      <Typography variant="h2" sx={{ color: "#fff", fontWeight: 700 }}>
        {"BlackBox."}
      </Typography>

      <Card sx={{ padding: 3, borderRadius: 3, width: "400px" }}>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
          Register
        </Typography>
        <Stack spacing={1}>
          {registerFormFields.map((field) => (
            <FormInputField
              key={field.name}
              label={field.label}
              type={field.type}
              fullWidth
              name={field.name}
              onChange={handleChange}
              value={userDetails[field.name]}
              error={errorMessage[field.name]}
            />
          ))}
          <Button
            variant="contained"
            sx={{
              backgroundColor: primary_colors.blue,
            }}
            fullWidth
            size="large"
            onClick={validateForm}
          >
            Get OTP
          </Button>
        </Stack>
        {/* ... */}
      </Card>
    </Box>
  );
}

export default Register;
