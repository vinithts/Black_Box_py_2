import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  my_deployment_card_colors,
  primary_colors,
} from "../../../controller/colors";
import { account_menu_font } from "../../../controller/fontSize";
import { Box, Button, Checkbox, Grid, Stack, Typography } from "@mui/material";
import InputField from "../../elements/InputField";
import DatePickers from "../../elements/DatePickers";
import TimePickers from "../../elements/TimePickers";
import { setStrategyValues } from "../../../redux/action/strategyAction";
import { connect } from "react-redux";
import MultipleSelect from "../../elements/MultipleSelect";
import { useState } from "react";
import { useEffect } from "react";

function MainContent({ nextStep, mainContent, setMainContent }) {
  const [selectedDays, setSelectedDays] = useState([]);

  const radioLabelStyle = {
    fontSize: account_menu_font.menuItems,
    color: primary_colors.white,
  };
  const handleChange = ({ target: { name, value } }) => {
    setMainContent({
      ...mainContent,
      [name]: value,
    });
  };

  const toggleDay = (day) => {
    let updatedSelectedDays;
    if (selectedDays.includes(day)) {
      updatedSelectedDays = selectedDays.filter((e) => e !== day);
    } else {
      updatedSelectedDays = [...selectedDays, day];
    }
    updatedSelectedDays.sort((a, b) => {
      const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      return weekDays.indexOf(a) - weekDays.indexOf(b);
    });
    setSelectedDays(updatedSelectedDays);

    setMainContent({
      ...mainContent,
      DAY_OF_WEEK: updatedSelectedDays.join(","),
    });
  };
  useEffect(() => {
    if (mainContent?.DAY_OF_WEEK) {
      setSelectedDays(mainContent.DAY_OF_WEEK.split(","));
    }
  }, [mainContent]);
  return (
    <>
      <FormControl>
        <RadioGroup
          row
          value={mainContent.strategyType}
          name="strategyType"
          onChange={(e) => {
            setMainContent({
              ...mainContent,
              strategyType: e.target.value,
              DAY_OF_WEEK: "",
              ENTRY_DATE: "",
              EXIT_DATE: "",
            });
            setSelectedDays([]);
          }}
          sx={{ color: primary_colors.white }}
        >
          <FormControlLabel
            sx={radioLabelStyle}
            control={
              <Radio
                size="small"
                value={"INTRADAY"}
                sx={{ color: primary_colors.white }}
              />
            }
            label={<Typography sx={radioLabelStyle}>Indraday</Typography>}
          />

          <FormControlLabel
            sx={radioLabelStyle}
            control={
              <Radio
                size="small"
                value={"STBT"}
                sx={{ color: primary_colors.white }}
              />
            }
            label={<Typography sx={radioLabelStyle}>STBT/BTST</Typography>}
          />
          <FormControlLabel
            sx={radioLabelStyle}
            control={
              <Radio
                size="small"
                value={"POSITIONAL"}
                sx={{ color: primary_colors.white }}
              />
            }
            label={<Typography sx={radioLabelStyle}>Positional</Typography>}
          />
        </RadioGroup>
      </FormControl>
      <Box m={1} />
      <Grid container spacing={3}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <InputField
            label={"Strategy Name*"}
            value={mainContent.strategyName}
            name="strategyName"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <MultipleSelect
            label={"Order Type*"}
            data={["MIS", "NRML", "CNC"]}
            value={mainContent.orderType}
            name="orderType"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <TimePickers
            label={"Entry Time*"}
            name="entryTime"
            value={mainContent.entryTime}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <TimePickers
            label={"Exit Time*"}
            value={mainContent.exitTime}
            name="exitTime"
            onChange={handleChange}
          />
        </Grid>
        {mainContent.strategyType === "INTRADAY" ||
        mainContent.strategyType === "STBT" ? (
          <Box sx={{ p: 2, px: 3 }}>
            <FormLabel
              sx={{
                fontSize: account_menu_font.menuItems,
                color: primary_colors.white,
              }}
            >
              Run on Days
            </FormLabel>
            <Box m={1} />
            <Stack display={"flex"} flexDirection={"row"}>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (e) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ color: primary_colors.white }}
                        onClick={() => toggleDay(e)}
                      />
                    }
                    checked={selectedDays.includes(e)}
                    onClick={() => toggleDay(e)}
                    label={
                      <Typography
                        sx={radioLabelStyle}
                        onClick={() => toggleDay(e)}
                      >
                        {e}
                      </Typography>
                    }
                  />
                )
              )}
            </Stack>
          </Box>
        ) : (
          <>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <DatePickers
                value={
                  mainContent.ENTRY_DATE ? new Date(mainContent.ENTRY_DATE) : ""
                }
                label={"ENTRY_DATE"}
                name={"ENTRY_DATE"}
                onChange={(e) =>
                  setMainContent({ ...mainContent, ENTRY_DATE: e.target.value })
                }
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <DatePickers
                value={
                  mainContent.EXIT_DATE ? new Date(mainContent.EXIT_DATE) : ""
                }
                label={"EXIT_DATE"}
                name={"EXIT_DATE"}
                onChange={(e) =>
                  setMainContent({ ...mainContent, EXIT_DATE: e.target.value })
                }
              />
            </Grid>
          </>
        )}
      </Grid>
      <Box m={2} />
      <Stack
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        alignItems={"flex-end"}
        sx={{ position: "absolute", bottom: 10, right: 20 }}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: primary_colors.danger, textTransform: "capitalize" }}
        >
          cancel
        </Button>
        <Box m={0.6} />
        <Button
          variant="contained"
          sx={{
            bgcolor: my_deployment_card_colors.buttonBg,
            textTransform: "capitalize",
          }}
          onClick={nextStep}
        >
          Continue
        </Button>
      </Stack>
    </>
  );
}
const mapStateToProps = (state) => ({
  start: state.StrategyReducer.start,
});

export default connect(mapStateToProps, { setStrategyValues })(MainContent);
