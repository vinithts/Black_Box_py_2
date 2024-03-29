import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, Grid, Link, ThemeProvider, createTheme } from "@mui/material";
import { primary_colors, top_navigation_colors } from "../../controller/colors";
import MultipleSelect from "../elements/MultipleSelect";
import InputField from "../elements/InputField";
import CustomizedButton from "../elements/CustomizedButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  minHeight: "40%",
  maxHeight: "90%",
  overflow: "auto",
  bgcolor: primary_colors.darkGray,
  border: "2px solid #000",
  boxShadow: 24,
  // p: 2,
  borderRadius: 2,
};

const AddBroker = ({ handleClose, open }) => {
  const theme = createTheme({
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: top_navigation_colors.activeText,
            },
            color: primary_colors.white,
          },
        },
      },
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ThemeProvider theme={theme}>
          <Box sx={style}>
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  color: primary_colors.white,
                  padding: "2.5% 5%",
                  fontWeight: 600,
                  lineHeight: "27px",
                }}
              >
                {"Add Broker Account"}
              </Typography>
              <Divider m={1} sx={{ bgcolor: primary_colors.gray }} />
              <Grid container spacing={1} p={"1.5%"}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <MultipleSelect label={"Broker Name"} />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <InputField label={"Client Code *"} />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <InputField label={"App Code * "} />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <InputField label={"Secret Key * "} />
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <InputField label={"Access Token * "} />
                </Grid>
                <Grid
                  item
                  xl={10}
                  lg={10}
                  md={10}
                  sm={6}
                  xs={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Link
                    component={"a"}
                    sx={{ color: "#FB3", textDecoration: "none" }}
                  >
                    Get Request Token?
                  </Link>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  sm={6}
                  xs={6}
                  sx={{ padding: "10px" }}
                >
                  <CustomizedButton value={"Conect"} size={"large"} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </Modal>
    </div>
  );
};

export default AddBroker;
