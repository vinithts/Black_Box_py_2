import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import MultipleSelect from "../elements/MultipleSelect";
import {
  my_deployment_card_colors,
  primary_colors,
} from "../../controller/colors";

function MyDeploymentCard() {
  return (
    <Card sx={{ bgcolor: primary_colors.blue, width: "100%", p: "1%" }}>
      <Box
        sx={{
          px: "1%",
          display: "flex",
          paddingBottom: ".75%",
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xl={9.5}
            lg={9.5}
            md={9.5}
            sm={9.5}
            xs={9.5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ color: primary_colors.white }}>
              {"All Weather BN2 By FistChoice Investment Consultant"}
            </Typography>
          </Grid>
          <Grid item xl={2.5} lg={2.5} md={2.5} sm={2.5} xs={2.5}>
            <Grid container spacing={1}>
              <Grid
                item
                xl={8}
                lg={8}
                md={8}
                sm={8}
                xs={8}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    marginRight: 10,
                    color: primary_colors.white,
                  }}
                >
                  Multiplier:
                </span>
                <MultipleSelect />
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                md={4}
                sm={4}
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton>
                  <MoreVertIcon
                    style={{ color: my_deployment_card_colors.icon }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ bgcolor: my_deployment_card_colors.icon }} />
      <Grid container spacing={1}>
        <Grid
          item
          xl={3.5}
          lg={3.5}
          md={3.5}
          sm={3.5}
          xs={3.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <br />
          <Box sx={{ py: "1%" }}>
            <Typography sx={{ color: primary_colors.white }}>
              <span
                style={{
                  display: "inline-block",
                  marginRight: 10,
                }}
              >
                Deployed on :
              </span>
              01- July - 2023
            </Typography>
          </Box>
          <Box sx={{ py: "1%", display: "flex", alignItems: "center" }}>
            <span
              style={{
                display: "block",
                marginRight: 10,
                color: primary_colors.white,
              }}
            >
              Deployed on :
            </span>
            <Box sx={{ minWidth: "40%" }}>
              <MultipleSelect />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xl={3.5}
          lg={3.5}
          md={3.5}
          sm={3.5}
          xs={3.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <br />
          <Box sx={{ paddingBottom: "3%" }}>
            <Typography sx={{ color: primary_colors.white }}>
              <span
                style={{
                  display: "inline-block",
                  marginRight: 10,
                }}
              >
                Capital:
              </span>
              $123.00 L
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: primary_colors.white }}>
              <span
                style={{
                  display: "inline-block",
                  marginRight: 10,
                }}
              >
                Status:
              </span>
              <span
                style={{
                  display: "inline-block",
                  marginRight: 10,
                  color: my_deployment_card_colors.statustext,
                  borderRadius: "5px",
                  fontWeight: 500,
                  background: my_deployment_card_colors.statusBg,
                  padding: "1% 4%",
                }}
              >
                Active
              </span>
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xl={3.5}
          lg={3.5}
          md={3.5}
          sm={3.5}
          xs={3.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <br />
          <Box sx={{ py: "1%" }}>
            <Typography sx={{ color: primary_colors.white }}>
              <span
                style={{
                  display: "inline-block",
                  marginRight: 10,
                }}
              >
                Broker:
              </span>
              Jainam Broking
            </Typography>
          </Box>
          <Box sx={{ py: "1%", display: "flex", alignItems: "center" }}>
            <span
              style={{
                display: "block",
                marginRight: 10,
                color: primary_colors.white,
              }}
            >
              Counter:
            </span>
            <Box sx={{ minWidth: "40%" }}>
              <MultipleSelect />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "1%",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: primary_colors.white }}>
          <span
            style={{
              display: "inline-block",
              marginRight: 10,
            }}
          >
            Total :
          </span>
          0
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "20%",
          }}
        >
          <Typography sx={{ color: primary_colors.white }}>
            <span
              style={{
                display: "inline-block",
                marginRight: 10,
                color: my_deployment_card_colors.indicationText,
              }}
            >
              -496
            </span>
            <br />
            <span
              style={{
                display: "inline-block",
                marginRight: 10,
                color: my_deployment_card_colors.indicationText,
              }}
            >
              -0.25%
            </span>
          </Typography>
          <Button
            sx={{
              bordeRadius: "5px",
              background: my_deployment_card_colors.buttonBg,
              color: primary_colors.white,
            }}
          >
            View More
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default MyDeploymentCard;
