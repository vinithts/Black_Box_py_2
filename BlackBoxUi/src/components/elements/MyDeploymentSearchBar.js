import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { primary_colors, secondary_colors } from "../../controller/colors";

const MyDeploymentSearchBar = () => {
  return (
    <Box
      sx={{
        height: 70,
        bgcolor: secondary_colors.black,
        borderRadius: "5px",
        mb: 1,
      }}
    >
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BsSearch color={primary_colors.white} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xl={2.3} lg={2.3} md={2.3} sm={12} xs={12}>
          <Typography
            variant="subtitle2"
            color={primary_colors.white}
            align="center"
          >
            CAPITAL
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            color={primary_colors.white}
            align="center"
          >
            $12.00L
          </Typography>
        </Grid>
        <Grid item xl={2.3} lg={2.3} md={2.3} sm={12} xs={12}>
          <Typography
            variant="subtitle2"
            color={primary_colors.white}
            align="center"
          >
            REALISED PNL
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            color={primary_colors.white}
            align="center"
          >
            $0 (0.00%)
          </Typography>
        </Grid>
        <Grid item xl={2.3} lg={2.3} md={2.3} sm={12} xs={12}>
          <Typography
            variant="subtitle2"
            color={primary_colors.white}
            align="center"
          >
            LIVE MTM
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            color={primary_colors.white}
            align="center"
          >
            $0(0)
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyDeploymentSearchBar;
