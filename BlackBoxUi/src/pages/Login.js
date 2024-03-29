import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import img from "../assets/images/Login_bg.jpg";
import { primary_colors } from "../controller/colors";
import { useNavigate } from "react-router";
import FormInputField from "../components/elements/FormInputField";
import { loginFormFields } from "../constant.js/inputdata";
import { LoginAction } from "../redux/action/AutenticationActions";
import { connect } from "react-redux";

function Login({ LoginAction }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    contactNumber: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const process = await LoginAction(credentials);
      if (process) {
        navigate("BlackBox/basket");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };
  return (
    <Box
      sx={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)),url(${img})`,
        backgroundSize: "cover",
        // backgroundColor: "#0b0a0f",

        width: "100%",
        backgroundBlendMode: "darken",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: "100vh",
          //   display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          sx={{ display: { xs: "none", sm: "block", md: "block" } }}
        >
          <Box sx={{ px: 5 }}>
            <Typography
              variant="h4"
              sx={{ mb: 1, fontWeight: "600", color: "#fff" }}
            >
              Start your
            </Typography>
            <Typography
              variant="h4"
              color={"rgb(10, 83, 225)"}
              sx={{ mb: 1, fontWeight: "600" }}
            >
              Algo Trading <span style={{ color: "#fff" }}>here</span>
            </Typography>

            <Typography
              variant="h4"
              sx={{ mb: 1, fontWeight: "600", color: "#fff" }}
            >
              (Nifty,banknifty&Finnifty)
            </Typography>
            <Typography sx={{ mb: 1, color: "#fff" }}>
              Strategies creator | Order Management | Prortfolio Management
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xl={6}
          lg={6}
          md={12}
          sm={12}
          xs={12}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <Card sx={{ padding: 3, borderRadius: 3, width: "60%" }}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                Sign In
              </Typography>

              <Stack spacing={1}>
                {loginFormFields.map((field) => (
                  <FormInputField
                    key={field.name}
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    onChange={handleChange}
                    value={credentials[field.name]}
                    fullWidth
                    required
                  />
                ))}

                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: "right", cursor: "pointer" }}
                >
                  <Link>Forgot Password?</Link>
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: primary_colors.blue,
                    textTransform: "capitalize",
                  }}
                  fullWidth
                  size="large"
                >
                  Sign in
                </Button>
              </Stack>
            </form>

            <br />
            <Typography
              variant="subtitle2"
              sx={{ textAlign: "center" }}
              onClick={() => navigate("/Register")}
            >
              Don't have an Account?
              <Link sx={{ cursor: "pointer" }}> Sign Up</Link>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default connect(null, { LoginAction })(Login);
