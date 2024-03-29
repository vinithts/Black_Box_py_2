import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Dashboard_table_colors,
  primary_colors,
  top_navigation_colors,
} from "../../controller/colors";
import { FaFilter } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import DashboardCard from "../../components/cards/DashboardCard";
import DashboardTable from "../../components/tables/DashboardTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Dashboard = () => {
  const [isExpanded, setExpand] = useState(false);

  const data = [
    {
      title: "Total Live Strategies",
      value: 10,
      icon: <MdLocalOffer color="#fff" size={20} />,
      color: "#44301E",
    },
    {
      title: "Total Exited",
      value: 100,
      icon: <MdLocalOffer color="#fff" size={20} />,
      color: "#143C3C",
    },
    {
      title: "Captial Deployed",
      value: 10,
      icon: <MdLocalOffer color="#fff" size={20} />,
      color: "#57262A",
    },
    {
      title: "Realised P&L",
      value: 10,
      icon: <MdLocalOffer color="#fff" size={20} />,
      color: "#242D4E",
    },
    {
      title: "Live MTM",
      value: 1000,
      icon: <MdLocalOffer color="#fff" size={20} />,
      color: "#46285A",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        paddingTop: "5%",
        background: primary_colors.black,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          width: "100%",
          bgcolor: "#382022",
          border: 2,
          borderTopColor: "#E82E2E",
          borderBottomColor: "#E82E2E",
          display: "flex",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <Typography variant="caption" color={"white"} sx={{ p: 2 }}>
          We're sorry! The server has encountered an internal error and was
          unable to complete your request.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ flexGrow: 2 }}>
          <Box
            sx={{
              p: "2.5%",
              minHeight: "5vh",
              overflowY: "hidden",
              width: 230,
              mx: 1,
              mt: 2,
              borderRadius: 1,
              bgcolor: top_navigation_colors.background,
            }}
          >
            <Stack
              display={"flex"}
              flexDirection={"row"}
              sx={{ alignItems: "center", p: ".5%" }}
            >
              <FaFilter color={"#2E6BE8"} size={25} />
              <Typography variant="h6" color={"#fff"} sx={{ mx: 1 }}>
                {"Dashboard Type"}
              </Typography>
            </Stack>
            <Divider sx={{ my: 1, bgcolor: "white" }} />

            <Box
              sx={{
                p: "2.5%",
              }}
            >
              {["Expired", "Today"].map((e, i) => (
                <Stack
                  key={i}
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  my={1.3}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography variant="body6" sx={{ color: "gray" }}>
                    {e}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, width: "90%", mt: 2 }}>
          <Grid container spacing={2}>
            {data?.map((a) => (
              <Grid item xl={2.4} lg={2.4} md={2.4} sm={6} xs={12}>
                <DashboardCard a={a} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ padding: "1%" }}>
            <Accordion
              expanded={isExpanded}
              onChange={() => setExpand((prev) => !prev)}
              sx={{ background: "transparent" }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{ color: primary_colors.white, fontSize: "xx-large" }}
                  />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                sx={{
                  background: Dashboard_table_colors.accordionBg,
                  color: primary_colors.white,
                  borderRadius: "10px",
                  padding: isExpanded ? ".5% 2.5%" : ".9% 2.5%",
                }}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  FirstChoice Investments Consultant
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "transparent",
                  color: primary_colors.white,
                }}
              >
                <DashboardTable />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
