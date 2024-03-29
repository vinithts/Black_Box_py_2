import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { my_deployment_card_colors, primary_colors } from '../../../controller/colors';
import { account_menu_font, profile_menu } from '../../../controller/fontSize';
import { Box, Button, Checkbox, Grid, Stack, Typography } from "@mui/material";
import DropdownWithInput from "../../elements/DropdownWithInput";
import TimePickers from "../../elements/TimePickers";
import InputField from "../../elements/InputField";
import { useEffect } from "react";

export default function AdvanceContent({ mainContent, setMainContent }) {
  const [strategyTarget, setStrategyTarget] = React.useState({
    type: "",
    value: "",
  });
  const [strategyStopLoss, setStrategyStopLoss] = React.useState({
    type: "",
    value: "",
  });
  const radioLabelStyle = {
    fontSize: account_menu_font.menuItems,
    color: primary_colors.white,
  };

  const handleChange = (e) => {
    setMainContent({ ...mainContent, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const strategyTargetData = mainContent.STATEGY_TARGET
      ? mainContent.STATEGY_TARGET.split(" ")
      : "";
    const strategyStopLossData = mainContent.STRATEGY_STOP_LOSS
      ? mainContent.STRATEGY_STOP_LOSS.split(" ")
      : "";

    if (strategyTargetData?.length === 2) {
      setStrategyTarget((prev) => ({
        ...prev,
        type: strategyTargetData[0],
        value: strategyTargetData[1],
      }));
    }
    if (strategyStopLossData?.length === 2) {
      setStrategyStopLoss((prev) => ({
        ...prev,
        type: strategyStopLossData[0],
        value: strategyStopLossData[1],
      }));
    }
  }, []);
  useEffect(() => {}, []);
  console.log(
    mainContent,
    "+++++++++++++++++++++++++++++++++++++++++++++++++++"
  );

  return (
    <>
      <Typography
        sx={{
          fontSize: profile_menu.subTitle,
          color: primary_colors.white,
          mb: 2,
        }}
      >
        Master Target and StopLoss
      </Typography>
      <Grid container spacing={1.4}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <TimePickers
            label={"Start Time*"}
            name={"ADVANCE_START_TIME"}
            value={mainContent.ADVANCE_START_TIME}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <TimePickers
            label={"End Time*"}
            name={"ADVANCE_END_TIME"}
            value={mainContent.ADVANCE_END_TIME}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <DropdownWithInput
            textLable={"Strategy Target*"}
            list={["Combined_Premium", "Amount"]}
            selectValue={strategyTarget.type}
            textValue={strategyTarget.value}
            onSelectChange={(e) => {
              setStrategyTarget((prev) => ({ ...prev, type: e.target.value }));
              setMainContent((prev) => ({
                ...prev,
                STATEGY_TARGET: `${e.target.value} ${strategyTarget.value}`,
              }));
            }}
            onTextChange={(e) => {
              setStrategyTarget((prev) => ({ ...prev, value: e.target.value }));
              setMainContent((prev) => ({
                ...prev,
                STATEGY_TARGET: `${strategyTarget.type} ${e.target.value}`,
              }));
            }}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <DropdownWithInput
            textLable={"Strategy Stoploss*"}
            list={["Combined_Premium", "Amount"]}
            selectValue={strategyStopLoss.type}
            textValue={strategyStopLoss.value}
            onSelectChange={(e) => {
              setStrategyStopLoss((prev) => ({
                ...prev,
                type: e.target.value,
              }));
              setMainContent((prev) => ({
                ...prev,
                STRATEGY_STOP_LOSS: `${e.target.value} ${strategyTarget.value}`,
              }));
            }}
            onTextChange={(e) => {
              setStrategyStopLoss((prev) => ({
                ...prev,
                value: e.target.value,
              }));
              setMainContent((prev) => ({
                ...prev,
                STRATEGY_STOP_LOSS: `${strategyTarget.type} ${e.target.value}`,
              }));
            }}
          />
        </Grid>
      </Grid>
      <Box m={1.5} />
      <Typography
        sx={{
          fontSize: profile_menu.subTitle,
          color: primary_colors.white,
          mb: 2,
        }}
      >
        Strategy Trailing*
      </Typography>
      <Grid container spacing={1.4}>
        <Grid item md={4} sm={12} xs={12}>
          <InputField
            label={"Activate at*"}
            name="ACTIVATE_AT"
            value={mainContent.ACTIVATE_AT}
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <InputField
            label={"When Profit Inc. by*"}
            value={mainContent.PROFIT_INC}
            name="PROFIT_INC"
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <InputField
            label={"Inc TSL by*"}
            value={mainContent.TSL_INC}
            name="TSL_INC"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box m={1.5} />

      <Typography
        sx={{
          fontSize: profile_menu.subTitle,
          color: primary_colors.white,
          mb: 2,
        }}
      >
        Trading Cycle*
      </Typography>
      <Grid container spacing={1.4}>
        <Grid item md={6} xs={12}>
          <InputField
            label={"No. of Cycle*"}
            value={mainContent.NO_OF_CYCLE}
            name="NO_OF_CYCLE"
            onChange={handleChange}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField
            label={"Cycle delay*"}
            value={mainContent.CYCLE_DELAY}
            name="CYCLE_DELAY"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box m={1.5} />
      <Stack display={"flex"} flexDirection={"row"}>
        <FormControlLabel
          control={<Checkbox sx={{ color: primary_colors.white }} />}
          label={
            <Typography sx={radioLabelStyle}>
              {"sqroff position on rejection"}
            </Typography>
          }
          value={mainContent.SQR_OFF_REJECTION}
          name={"SQR_OFF_REJECTION"}
          onChange={(e) => handleChange(e)}
        />
        <FormControlLabel
          control={<Checkbox sx={{ color: primary_colors.white }} />}
          label={
            <Typography sx={radioLabelStyle}>{"Allow late Trading"}</Typography>
          }
          value={mainContent.ALLOW_LATETRADING}
          name="ALLOW_LATETRADING"
          onChange={(e) => handleChange(e)}
        />
      </Stack>

      <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
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
        >
          Continue
        </Button>
      </Stack>
    </>
  );
}