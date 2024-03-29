import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Dashboard_table_colors,
  primary_colors,
  top_navigation_colors,
} from "../../controller/colors";
import { FaFilter } from "react-icons/fa";
import LogsTable from "../../components/tables/LogsTable";

const Logs = () => {
  const [isExpanded, setExpand] = useState(false);

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
                {"Fiter Type"}
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
                <LogsTable />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Logs;
