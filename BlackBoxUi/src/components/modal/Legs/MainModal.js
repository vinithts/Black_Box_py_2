import React, { createContext, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Tab, Tabs, ThemeProvider, createTheme } from "@mui/material";
import {
  primary_colors,
  top_navigation_colors,
} from "../../../controller/colors";
import MainContent from "./MainContent";
import AdvanceContent from "./AdvanceContent";
import RemarksContent from "./RemarksContent";
import LegsContent from "./LegsContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
  minHeight: "70%",
  maxHeight: "90%",
  overflow: "auto",
  bgcolor: primary_colors.darkGray,
  border: "2px solid #000",
  boxShadow: 24,
  // p: 2,
  borderRadius: 2,
};

function CustomTabPanel(props) {
  const { children, value, index, padding, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: padding ? padding : 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function MainModal({
  open,
  handleClose,
  clone,
  basketId,
  edit,
  closeModal,
}) {
  const [value, setValue] = React.useState(0);
  const [spot, setSpot] = useState("SPOT");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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

  const [mainContent, setMainContent] = useState({
    basketId: basketId,
    strategyName: "",
    index: "NIFTY",
    segment: "OPTIONS",
    orderType: "",
    strategyShortDescription: "",
    strategyLongDescription: "",
    strategyType: "INTRADAY",
    strategyCondition: [],
    STRATEGY_STOP_LOSS: "",
    STATEGY_TARGET: "",
  });
  const [legs, setLegs] = useState([]);

  console.log(mainContent);

  const [repeat, setRepeat] = useState("none");
  const [legTemplate, setLegTemplate] = useState({
    legOrderType: "CE",
    tradeType: "SELL",
    expiryDate: new Date(),
    legCondition: "ATM_POINT",
    spotOrFutures: spot,
    strikePrice: "ATM",
    reEntryOrReExecute: "",
    totalLots: 1,
    END_TIME: "",
    ENTRY_ON: "",
    START_TIME: "1",
    TARGET_PROFIT: "",
    TRAIL_STOP_LOSS: "",
    STOP_LOSS: "",
    WAIT_TRADE: "",
    legIndex: "NIFTY",
  });
  const [waitTrade, setwaitTrade] = useState(false);
  const [deletedLeg, setDeletedLeg] = useState([]);
  const [orb, setOrb] = useState(false);
  const [cpValue, setCpValue] = useState({
    type: "CP~",
    value: "",
  });

  const nextStep = () => {
    setValue((prev) => prev + 1);
  };
  const setIndex = (value) => {
    setMainContent({ ...mainContent, index: value });
  };

  useEffect(() => {
    if (clone) {
      const a = { ...clone, strategyName: "" };
      delete a.strategyCondition;
      delete a.legs;
      delete a.strategyId;
      setMainContent(a);
      setLegs(clone.legs);
    }
  }, [clone]);

  useEffect(() => {
    if (edit) {
      const a = { ...edit };
      delete a.legs;
      setMainContent(a);
      setLegs(edit.legs);
    }
  }, [edit]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ThemeProvider theme={theme}>
          <Box sx={{ ...style, width: value === 1 ? "90%" : 600 }}>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  border: `1px solid ${primary_colors.gray}`,
                  borderRadius: 2,
                  m: 2,
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  TabIndicatorProps={{
                    style: {
                      display: "none",
                    },
                  }}
                >
                  <Tab
                    label="Start"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    label="Legs"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    label="Advance"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                  <Tab
                    label="Remarks"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <Box m={-3} />
                <MainContent
                  nextStep={nextStep}
                  mainContent={mainContent}
                  setMainContent={setMainContent}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1} padding={"0"}>
                <LegsContent
                  spot={spot}
                  setSpot={setSpot}
                  nextStep={nextStep}
                  setLegs={setLegs}
                  legs={legs}
                  setIndex={setIndex}
                  index={mainContent.index}
                  setLegTemplate={setLegTemplate}
                  legTemplate={legTemplate}
                  waitTrade={waitTrade}
                  setwaitTrade={setwaitTrade}
                  orb={orb}
                  setOrb={setOrb}
                  cpValue={cpValue}
                  setCpValue={setCpValue}
                  repeat={repeat}
                  setRepeat={setRepeat}
                  deletedLeg={deletedLeg}
                  setDeletedLeg={setDeletedLeg}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <Box m={-3} />
                <AdvanceContent
                  mainContent={mainContent}
                  setMainContent={setMainContent}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <Box m={-3} />
                <RemarksContent
                  strategyDetails={mainContent}
                  setStrategyDetails={setMainContent}
                  legs={legs}
                  handleClose={handleClose}
                  deletedLeg={deletedLeg}
                />
              </CustomTabPanel>
            </Box>
          </Box>
        </ThemeProvider>
      </Modal>
    </div>
  );
}
