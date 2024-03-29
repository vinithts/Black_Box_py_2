import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { primary_colors } from "../../controller/colors";

const DashboardCard = ({ a }) => {
  return (
    <Card
      sx={{
        height: 130,
        borderRadius: 2,
        backgroundImage: `linear-gradient(240deg, ${a.color} 4%, ${primary_colors.black} 80%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Typography
        sx={{ fontSize: "1.1rem", px: 2 }}
        fontWeight={"bold"}
        color={primary_colors.white}
      >
        {a.title}
      </Typography>
      <Typography
        sx={{ fontSize: "1.6rem", px: 2 }}
        fontWeight={"bold"}
        color={primary_colors.white}
      >
        {a.value}
      </Typography>
      <Box
        sx={{
          height: 40,
          width: 40,
          bgcolor: `${a.color}`,
          position: "absolute",
          borderRadius: "50%",
          right: 20,
          bottom: 20,
          display: "grid",
          placeItems: "center",
        }}
      >
        {a.icon}
      </Box>
    </Card>
  );
};

export default DashboardCard;
