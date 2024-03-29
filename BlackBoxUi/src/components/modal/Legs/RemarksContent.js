import * as React from 'react';
import { my_deployment_card_colors, primary_colors } from '../../../controller/colors';
import { Box, Button, Stack } from "@mui/material";
import InputField from "../../elements/InputField";
import {
  create_strategy,
  get_all_strategies_by_basketId,
  update_strategy,
} from "../../../redux/action/strategyAction";
import { connect } from "react-redux";

function RemarksContent({
  strategyDetails,
  setStrategyDetails,
  create_strategy,
  update_strategy,
  get_all_strategies_by_basketId,
  legs,
  handleClose,
  deletedLeg,
}) {
  const handleChange = (e) => {
    setStrategyDetails({
      ...strategyDetails,
      [e.target.name]: e.target.value,
    });
  };
  const refreshData = () => {
    get_all_strategies_by_basketId(sessionStorage.getItem("bId"));
  };

  const newLegs = legs.filter((e) => !e.legId);
  const oldLegs = legs.filter((e) => e.legId);
  console.log(newLegs);
  const handleSubmit = () => {
    if (strategyDetails.strategyId) {
      update_strategy(
        strategyDetails,
        oldLegs,
        refreshData,
        handleClose,
        deletedLeg,
        newLegs
      );
    } else {
      create_strategy(strategyDetails, legs, refreshData, handleClose);
    }
  };

  return (
    <>
      <form>
        <Box my={2}>
          <InputField
            label={"Short  Description"}
            name={"strategyShortDescription"}
            value={strategyDetails.strategyShortDescription}
            onChange={handleChange}
          />
        </Box>
        <Box my={2}>
          <InputField
            multiline
            rows={5}
            label={"Description"}
            name={"strategyLongDescription"}
            value={strategyDetails.strategyLongDescription}
            onChange={handleChange}
          />
        </Box>
      </form>

      <br />

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
          onClick={handleSubmit}
        >
          {strategyDetails.strategyId ? "Update Strategy" : "Create Strategy"}
        </Button>
      </Stack>
    </>
  );
}
export default connect(null, {
  create_strategy,
  update_strategy,
  get_all_strategies_by_basketId,
})(RemarksContent);