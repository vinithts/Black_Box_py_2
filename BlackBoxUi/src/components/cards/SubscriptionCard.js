import { useState } from 'react';
import { Box, Card, Divider, Grid, Stack, Typography, MenuItem, IconButton, Popover, Button } from "@mui/material";
import { SlOptionsVertical } from "react-icons/sl";
import { FiEdit } from "react-icons/fi";
import { BsXOctagon } from "react-icons/bs";
import {
  my_subscription_card_colors,
  primary_colors,
} from "../../controller/colors";

export default function SubscriptionCard({ e }) {
  const {
    createdOn,
    title,
    type,
    totalStrategy,
    dropdown,
    capital,
    description,
  } = e;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Card
        sx={{
          bgcolor: primary_colors.blue,
          px: "1%",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="body2" sx={{ color: primary_colors.white }}>
            Created on: {createdOn} | Live Deployment: 450
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: primary_colors.white, fontWeight: "bold" }}
          >
            {title}
          </Typography>
          <IconButton
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              cursor: "pointer",
            }}
            onClick={handleMenuClick}
          >
            <SlOptionsVertical color={primary_colors.white} size={15} />
          </IconButton>
          <Stack display={"flex"} flexDirection={"row"} my={1}>
            {type.map((e, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{
                  bgcolor: my_subscription_card_colors.labelBg,
                  px: 1.2,
                  py: 0.5,
                  mx: 0.5,
                  borderRadius: 4,
                  color: primary_colors.white,
                }}
              >
                {e}
              </Typography>
            ))}
          </Stack>
          <Typography variant="body2" sx={{ color: primary_colors.white }}>
            Total Strategy: {totalStrategy}
          </Typography>

          <Grid container>
            <Grid item xs={10}>
              <Grid container>
                <Grid item xs={3}>
                  <Typography
                    variant="caption"
                    sx={{ color: primary_colors.white }}
                  >
                    Drawdown
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="caption"
                    sx={{ color: primary_colors.white }}
                  >
                    min. capital
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    sx={{ color: primary_colors.white, fontWeight: "bold" }}
                  >
                    {dropdown}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    sx={{ color: primary_colors.white, fontWeight: "bold" }}
                  >
                    {capital}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: my_subscription_card_colors.buttonBg }}
              >
                Deploy
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Divider m={1} sx={{ bgcolor: primary_colors.gray }} />
        <Typography
          variant="caption"
          sx={{ color: primary_colors.white, p: 1, textAlign: "center" }}
        >
          {description}
        </Typography>
      </Card>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <FiEdit />
          &nbsp;&nbsp;<Typography sx={{ fontSize: 14 }}>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography sx={{ fontSize: 14 }}>
            <BsXOctagon />
            &nbsp;&nbsp;Unsubscribe
          </Typography>
        </MenuItem>
      </Popover>
    </>
  );
}
