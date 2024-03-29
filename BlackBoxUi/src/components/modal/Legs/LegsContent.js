import React, { useState, useEffect, useLayoutEffect } from "react";
import { account_menu_font } from "../../../controller/fontSize";
import {
  Dashboard_table_colors,
  primary_colors,
} from "../../../controller/colors";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MultipleSelect from "../../elements/MultipleSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomizedButton from "../../elements/CustomizedButton";
import { IOSSwitch } from "../../../controller/styles";
import DatePickers from "../../elements/DatePickers";
import InputField from "../../elements/InputField";
import DropdownWithInput from "../../elements/DropdownWithInput";
import {
  ATMpoint_Banknifty,
  ATMpoint_Other,
  buysell,
  callput,
  strike_price_percentage,
} from "../../../constant.js/inputdata";
import TimePickers from "../../elements/TimePickers";
const checkBoxLabelStyle = {
  fontSize: account_menu_font.menuItems,
  color: primary_colors.white,
  padding: "2px 5px",
};
const split = (string, condition) => {
  return string.split(condition);
};
const LegsContent = ({
  nextStep,
  legs,
  setLegs,
  index,
  setIndex,
  spot,
  setSpot,
  setLegTemplate,
  legTemplate,
  waitTrade,
  setwaitTrade,
  orb,
  setOrb,
  cpValue,
  setCpValue,
  repeat,
  setRepeat,
  deletedLeg,
  setDeletedLeg,
}) => {
  useEffect(() => {
    if (legTemplate.legCondition === "CLOSEST_PREMIUM") {
      setLegTemplate((prev) => ({
        ...prev,
        strikePrice: `${cpValue.type} ${cpValue.value}`,
      }));
    }
  }, [cpValue.type, cpValue.value, legTemplate.legCondition]);

  const radioLabelStyle = {
    fontSize: account_menu_font.menuItems,
    color: primary_colors.white,
  };

  const handleSpot = () => {
    const data = legs.map((a) => {
      if (spot === "SPOT") {
        return {
          ...a,
          spotOrFutures: "SPOT",
        };
      } else {
        return {
          ...a,
          spotOrFutures: "FEATURE",
        };
      }
    });
    setLegs(data);
  };

  const handleChange = (e) => {
    setLegTemplate((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setLegs((prev) => [...prev, { ...legTemplate, legIndex: index }]);
  };
  useEffect(() => {
    handleSpot();
  }, [spot]);

  console.log(legTemplate);
  console.log(legs);

  return (
    <>
      <Box>
        <Box sx={{ padding: "8px 16px 16px 16px" }}>
          <RadioGroup
            row
            sx={{
              color: primary_colors.white,
              justifyContent: "center",
            }}
            name="legCondition"
            value={legTemplate.legCondition}
            onChange={(e) => {
              setLegTemplate((prev) => ({ ...prev, strikePrice: "" }));
              handleChange(e);
            }}
          >
            <FormControlLabel
              sx={radioLabelStyle}
              value="ATM_POINT"
              control={
                <Radio size="small" sx={{ color: primary_colors.white }} />
              }
              label={<Typography sx={radioLabelStyle}>ATM Point</Typography>}
            />
            <FormControlLabel
              sx={radioLabelStyle}
              value="ATM_PERCENT"
              control={
                <Radio size="small" sx={{ color: primary_colors.white }} />
              }
              label={<Typography sx={radioLabelStyle}>ATM Percent</Typography>}
            />
            <FormControlLabel
              sx={radioLabelStyle}
              value="CLOSEST_PREMIUM"
              control={
                <Radio size="small" sx={{ color: primary_colors.white }} />
              }
              label={
                <Typography sx={radioLabelStyle}>
                  Closest Premium(CP){" "}
                </Typography>
              }
            />
          </RadioGroup>

          <Box m={2} />
          <Grid container spacing={1}>
            <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
              <MultipleSelect
                label={"Select Index"}
                required
                value={index}
                data={["NIFTY", "BANKNIFTY", "FINNIFTY"]}
                name="index"
                onChange={(e) => {
                  setIndex(e.target.value);
                  setLegTemplate((prev) => ({ ...prev, strikePrice: "" }));
                }}
              />
            </Grid>

            <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
              <MultipleSelect
                label={"B/S"}
                data={buysell}
                value={legTemplate.tradeType}
                name={"tradeType"}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
              <MultipleSelect
                label={"CE/PE"}
                data={callput}
                value={legTemplate.legOrderType}
                keys={["name", "value"]}
                name="legOrderType"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
              <DatePickers
                label={"Expiry Date"}
                name={"expiryDate"}
                required
                value={legTemplate.expiryDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
              <InputField
                label={"Lots"}
                name={"totalLots"}
                required
                value={legTemplate.totalLots}
                onChange={handleChange}
              />
            </Grid>
            {legTemplate.legCondition !== "CLOSEST_PREMIUM" ? (
              <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                <MultipleSelect
                  label={"Strike Selection"}
                  data={
                    legTemplate.legCondition === "ATM_PERCENT"
                      ? strike_price_percentage
                      : index !== "BANKNIFTY"
                      ? ATMpoint_Other
                      : ATMpoint_Banknifty
                  }
                  name={"strikePrice"}
                  value={legTemplate.strikePrice}
                  onChange={(a) =>
                    setLegTemplate((prev) => ({
                      ...prev,
                      strikePrice: a.target.value,
                    }))
                  }
                />
              </Grid>
            ) : (
              <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                <DropdownWithInput
                  list={["CP~", "CP>=", "CP<="]}
                  onTextChange={(e) => {
                    setCpValue((prev) => ({ ...prev, value: e.target.value }));
                  }}
                  onSelectChange={(e) => {
                    setCpValue((prev) => ({ ...prev, type: e.target.value }));
                  }}
                  selectValue={cpValue.type}
                  textValue={cpValue.value}
                  value={legTemplate.strikePrice}
                  name={"strikePrice"}
                />
              </Grid>
            )}
            {/* {
            type === 'CP' &&
            <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
              <MultipleSelect label={"Price nearby"} />
            </Grid>
          } */}
          </Grid>
          <Box m={3} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <CustomizedButton
              type="submit"
              onClick={handleSubmit}
              value={"Add Position"}
              customizedStyles={{
                background: primary_colors.green,
                padding: "1% 2%",
                width: "fit-content",
              }}
            />
          </Box>

          <Box m={3} />
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ color: primary_colors.white }}>
                Use Spot as ATM
              </span>
              <IOSSwitch
                sx={{ m: 1 }}
                onClick={() =>
                  setSpot((prev) => (prev === "SPOT" ? "FEATURE" : "SPOT"))
                }
                checked={spot === "FEATURE"}
              />
              <span style={{ color: primary_colors.white }}>
                Use Futures as ATM
              </span>
            </Box>

            <RadioGroup
              row
              sx={{
                color: primary_colors.white,
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                sx={checkBoxLabelStyle}
                control={
                  <Checkbox
                    checked={waitTrade}
                    sx={checkBoxLabelStyle}
                    onChange={(e) => {
                      setwaitTrade(e.target.checked);
                      !e.target.checked &&
                        setLegs(
                          legs?.map((b) => ({
                            ...b,
                            WAIT_TRADE: "",
                          }))
                        );
                    }}
                  />
                }
                label={
                  <Typography sx={checkBoxLabelStyle}>Wait & Trade</Typography>
                }
              />
              <FormControlLabel
                sx={checkBoxLabelStyle}
                control={
                  <Checkbox
                    checked={orb}
                    sx={checkBoxLabelStyle}
                    onChange={(e) => {
                      setOrb(e.target.checked);
                      !e.target.checked &&
                        setLegs(
                          legs?.map((b) => ({
                            ...b,
                            START_TIME: "",
                            END_TIME: "",
                            ENTRY_ON: "",
                          }))
                        );
                    }}
                  />
                }
                label={<Typography sx={checkBoxLabelStyle}>ORB</Typography>}
              />

              <ButtonGroup aria-label="outlined primary button group">
                <Button
                  variant={repeat === "Re-Entry" ? "contained" : "outlined"}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => setRepeat("Re-Entry")}
                >
                  Re-Entry
                </Button>
                <Button
                  variant={repeat === "Re-Execute" ? "contained" : "outlined"}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => setRepeat("Re-Execute")}
                >
                  Re-Execute
                </Button>
                <Button
                  variant={repeat === "none" ? "contained" : "outlined"}
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => setRepeat("none")}
                >
                  None
                </Button>
              </ButtonGroup>
            </RadioGroup>
          </Box>
          <Box m={2} />

          {legs?.map((e, i) => {
            return (
              <LegCard
                e={e}
                i={i}
                legs={legs}
                setLegs={setLegs}
                repeat={repeat}
                orb={orb}
                setOrb={setOrb}
                setRepeat={setRepeat}
                setwaitTrade={setwaitTrade}
                waitTrade={waitTrade}
                setSpot={setSpot}
                spot={spot}
                deletedLeg={deletedLeg}
                setDeletedLeg={setDeletedLeg}
              />
            );
          })}

          <Box m={3} />
        </Box>
        <Divider sx={{ bgcolor: primary_colors.white }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1% 5%",
          }}
        >
          <Typography sx={{ color: primary_colors.white, flexGrow: 4 }}>
            Total Legs: {legs.length}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <CustomizedButton
              value={"Cancel"}
              customizedStyles={{
                background: primary_colors.danger,
                width: "45%",
              }}
            />
            <CustomizedButton
              onClick={nextStep}
              value={"Continue"}
              customizedStyles={{ width: "45%" }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LegsContent;

const LegCard = ({
  e,
  i,
  legs,
  setLegs,
  repeat,
  orb,
  waitTrade,
  deletedLeg,
  setDeletedLeg,
}) => {
  const [legAdvanced, setlegAdvanced] = useState({
    TARGET_PROFIT: false,
    STOP_LOSS: false,
    TRAIL_STOP_LOSS: false,
  });
  const [waitTradeValues, setwaitTradeValues] = useState({
    type1: "",
    type2: "",
    value: "",
  });
  const [cpValue, setCpValue] = useState({
    type: "",
    value: "",
  });
  const [target, setTarget] = useState({
    type: "",
    value: "",
  });
  const [stopLoss, setStopLoss] = useState({
    type: "",
    value: "",
  });
  const [tsl, setTsl] = useState({
    type: "",
    value1: "",
    value2: "",
  });

  const handleAdvanced = (e, i) => {
    setlegAdvanced({ ...legAdvanced, [e.target.name]: e.target.checked });
    let a = legs?.map((b, index) => {
      if (i === index && !e.target.checked) {
        return {
          ...b,
          [e.target.name]: "",
        };
      } else {
        return b;
      }
    });
    setLegs(a);
  };

  const handleLegsChange = (e, id) => {
    const data = legs.map((a, index) => {
      if (id === index) {
        return {
          ...a,
          [e.target.name]: e.target.value,
        };
      } else {
        return a;
      }
    });
    setLegs(data);
  };
  useEffect(() => {
    let a = legs.map((b) => {
      if (repeat === "none") {
        return {
          ...b,
          RE_ENTRY: "",
          RE_EXECUTE: "",
        };
      } else {
        return {
          ...b,
          RE_ENTRY: "",
          RE_EXECUTE: "",
        };
      }
    });
    setLegs(a);
  }, [repeat]);
  useEffect(() => {
    if (e.legCondition === "CLOSEST_PREMIUM") {
      handleLegsChange(
        {
          target: {
            name: "strikePrice",
            value: `${cpValue.type} ${cpValue.value}`,
          },
        },
        i
      );
    }
  }, [cpValue.type, cpValue.value]);

  useEffect(() => {
    if (waitTrade) {
      handleLegsChange(
        {
          target: {
            name: "WAIT_TRADE",
            value: `${waitTradeValues.type1} ${waitTradeValues.type2} ${waitTradeValues.value}`,
          },
        },
        i
      );
    } else {
      handleLegsChange(
        {
          target: {
            name: "WAIT_TRADE",
            value: ``,
          },
        },
        i
      );
    }
  }, [
    waitTradeValues.type1,
    waitTradeValues.type2,
    waitTradeValues.value,
    waitTrade,
  ]);

  useEffect(() => {
    if (legAdvanced.TRAIL_STOP_LOSS) {
      handleLegsChange(
        {
          target: {
            name: "TRAIL_STOP_LOSS",
            value: `${tsl.type} ${tsl.value1} ${tsl.value2}`,
          },
        },
        i
      );
    } else {
      handleLegsChange(
        {
          target: {
            name: "TRAIL_STOP_LOSS",
            value: ``,
          },
        },
        i
      );
    }
  }, [tsl.type, tsl.value1, tsl.value2, legAdvanced.TRAIL_STOP_LOSS]);
  useEffect(() => {
    if (legAdvanced.STOP_LOSS) {
      handleLegsChange(
        {
          target: {
            name: "STOP_LOSS",
            value: `${stopLoss.type} ${stopLoss.value}`,
          },
        },
        i
      );
    } else {
      handleLegsChange(
        {
          target: {
            name: "STOP_LOSS",
            value: ``,
          },
        },
        i
      );
    }
  }, [stopLoss.type, stopLoss.value, legAdvanced.STOP_LOSS]);
  useEffect(() => {
    if (legAdvanced.TARGET_PROFIT) {
      handleLegsChange(
        {
          target: {
            name: "TARGET_PROFIT",
            value: `${target.type} ${target.value}`,
          },
        },
        i
      );
    } else {
      handleLegsChange(
        {
          target: {
            name: "TARGET_PROFIT",
            value: ``,
          },
        },
        i
      );
    }
  }, [target.type, target.value, legAdvanced.TARGET_PROFIT]);
  useEffect(() => {
    handleLegsChange(
      {
        target: {
          name: "TARGET_PROFIT",
          value: `${target.type} ${target.value}`,
        },
      },
      i
    );
  }, [target.type, target.value]);
  useEffect(() => {
    if (e.legCondition === "CLOSEST_PREMIUM") {
      const cp = e.strikePrice.split(" ");
      setCpValue((prev) => ({
        ...prev,
        value: cp[1],
        type: cp[0],
      }));
    }
  }, []);

  useEffect(() => {
    if (e.TARGET_PROFIT && e.TRAIL_STOP_LOSS && e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,
        TRAIL_STOP_LOSS: true,
        TARGET_PROFIT: true,
        STOP_LOSS: true,
      });
    } else if (e.TARGET_PROFIT && e.TRAIL_STOP_LOSS && !e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,
        TRAIL_STOP_LOSS: true,
        TARGET_PROFIT: true,
      });
    } else if (e.TARGET_PROFIT && !e.TRAIL_STOP_LOSS && e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,
        TARGET_PROFIT: true,
        STOP_LOSS: true,
      });
    } else if (!e.TARGET_PROFIT && e.TRAIL_STOP_LOSS && e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,
        TRAIL_STOP_LOSS: true,
        STOP_LOSS: true,
      });
    } else if (!e.TARGET_PROFIT && !e.TRAIL_STOP_LOSS && e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,

        STOP_LOSS: true,
      });
    } else if (!e.TARGET_PROFIT && e.TRAIL_STOP_LOSS && !e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,

        TRAIL_STOP_LOSS: true,
      });
    } else if (e.TARGET_PROFIT && !e.TRAIL_STOP_LOSS && !e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,

        TARGET_PROFIT: true,
      });
    } else if (!e.TARGET_PROFIT && e.TRAIL_STOP_LOSS && !e.STOP_LOSS) {
      setlegAdvanced({
        ...legAdvanced,
        TRAIL_STOP_LOSS: true,
      });
    }
  }, []);
  console.log(waitTradeValues);
  useLayoutEffect(() => {
    const targetData = e?.TARGET_PROFIT ? split(e.TARGET_PROFIT, " ") : "";
    const tslData = e?.TRAIL_STOP_LOSS ? split(e.TRAIL_STOP_LOSS, " ") : "";
    const stopLossData = e?.STOP_LOSS ? split(e.STOP_LOSS, " ") : "";
    const waitTradeData = e?.WAIT_TRADE ? split(e.WAIT_TRADE, " ") : "";
    if (waitTradeData?.length === 3) {
      setwaitTradeValues((prev) => ({
        ...prev,
        type1: waitTradeData[0],
        type2: waitTradeData[1],
        value: waitTradeData[2],
      }));
    }
    if (tslData?.length === 3) {
      setTsl((prev) => ({
        ...prev,
        type: tslData[0],
        value1: tslData[1],
        value2: tslData[2],
      }));
    }
    if (targetData?.length === 2) {
      if (targetData?.length === 2) {
        setTarget((prev) => ({
          ...prev,
          type: targetData[0],
          value: targetData[1],
        }));
      }
    }
    if (stopLossData?.length === 2) {
      if (targetData?.length === 2) {
        setStopLoss((prev) => ({
          ...prev,
          type: stopLossData[0],
          value: stopLossData[1],
        }));
      }
    }
  }, []);

  const deleteLeg = (leg, index) => {
    if (leg.legId) {
      setDeletedLeg([...deletedLeg, leg.legId]);
    }
    const data = legs.filter((_, i) => i !== index);
    setLegs(data);
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        border: 1,
        p: 1,
        my: 2,
        borderColor: primary_colors.gray,
        borderRadius: 2,
        bgcolor: "#212026",
      }}
      key={i}
    >
      <Grid item md={2} sm={6} xs={12}>
        <MultipleSelect
          label={"B/S"}
          data={buysell}
          value={e.tradeType}
          name={"tradeType"}
          onChange={(e) => handleLegsChange(e, i)}
        />
      </Grid>
      <Grid item md={2} sm={6} xs={12}>
        <MultipleSelect
          label={"CE/PE"}
          data={callput}
          value={e.legOrderType}
          keys={["name", "value"]}
          name="legOrderType"
          onChange={(e) => handleLegsChange(e, i)}
        />
      </Grid>
      <Grid item md={2} sm={6} xs={12}>
        <DatePickers
          label={"Expiry Date"}
          name={"expiryDate"}
          required
          value={new Date(e.expiryDate)}
          onChange={(e) => handleLegsChange(e, i)}
        />
      </Grid>
      {e.legCondition !== "CLOSEST_PREMIUM" ? (
        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
          <MultipleSelect
            label={"Strike Selection"}
            data={
              e.legCondition === "ATM_PERCENT"
                ? strike_price_percentage
                : e.legIndex !== "BANKNIFTY"
                ? ATMpoint_Other
                : ATMpoint_Banknifty
            }
            name={"strikePrice"}
            value={e.strikePrice}
            onChange={(e) => handleLegsChange(e, i)}
          />
        </Grid>
      ) : (
        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
          <DropdownWithInput
            list={["CP~", "CP>=", "CP<="]}
            onTextChange={(e) => {
              setCpValue((prev) => ({ ...prev, value: e.target.value }));
            }}
            onSelectChange={(e) => {
              setCpValue((prev) => ({ ...prev, type: e.target.value }));
            }}
            selectValue={cpValue.type}
            textValue={cpValue.value}
            value={e.strikePrice}
            name={"strikePrice"}
          />
        </Grid>
      )}
      <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
        <InputField
          label={"Lots"}
          name={"totalLots"}
          required
          value={e.totalLots}
          onChange={(e) => handleLegsChange(e, i)}
        />
      </Grid>
      {/* Repeat   ------------------- */}
      {repeat !== "none" && (
        <Grid item md={2} sm={6} xs={12}>
          <InputField
            label={`No of times (${repeat})`}
            value={repeat === "Re-Entry" ? e.RE_ENTRY : e.RE_EXECUTE}
            onChange={(e) => {
              let a = legs.map((b, index) => {
                if (repeat === "Re-Entry" && i === index) {
                  return {
                    ...b,
                    RE_ENTRY: e.target.value,
                    RE_EXECUTE: "",
                  };
                } else if (repeat === "Re-Execute" && i === index) {
                  return {
                    ...b,
                    RE_ENTRY: "",
                    RE_EXECUTE: e.target.value,
                  };
                } else {
                  return b;
                }
              });
              setLegs(a);
            }}
          />
        </Grid>
      )}
      {/* ======================= ORB ===================== */}
      {orb && (
        <>
          <Grid item md={2} sm={6} xs={12}>
            <TimePickers
              label={"Start time"}
              name={"START_TIME"}
              value={e?.START_TIME}
              onChange={(a) => handleLegsChange(a, i)}
            />
          </Grid>

          <Grid item md={2} sm={6} xs={12}>
            <TimePickers
              label={"End time"}
              name={"END_TIME"}
              value={e?.END_TIME}
              onChange={(a) => handleLegsChange(a, i)}
            />
          </Grid>
          <Grid item md={2} sm={6} xs={12}>
            <MultipleSelect
              data={["High", "Low"]}
              label={"Entry on"}
              value={e?.ENTRY_ON || ""}
              name={"ENTRY_ON"}
              onChange={(a) => handleLegsChange(a, i)}
            />
          </Grid>
        </>
      )}
      {/* ======================= wait & trade ===================== */}
      {waitTrade && (
        <>
          <Grid item md={2} sm={6} xs={12}>
            <MultipleSelect
              data={["Percentage", "Points", "Spot"]}
              value={waitTradeValues.type1}
              onChange={(a) =>
                setwaitTradeValues((prev) => ({
                  ...prev,
                  type1: a.target.value,
                }))
              }
            />
          </Grid>
          <Grid item md={2} sm={6} xs={12}>
            <DropdownWithInput
              list={[
                { type: "↑", value: "profit" },
                { type: "↓", value: "loss" },
              ]}
              selectValue={waitTradeValues.type2}
              textValue={waitTradeValues.value}
              displayValue={"type"}
              selectedValue={"value"}
              onTextChange={(a) => {
                setwaitTradeValues((prev) => ({
                  ...prev,
                  value: a.target.value,
                }));
              }}
              onSelectChange={(a) => {
                setwaitTradeValues((prev) => ({
                  ...prev,
                  type2: a.target.value,
                }));
              }}
            />
          </Grid>
        </>
      )}
      <Grid container spacing={1} mt={1}>
        {/* ===================== Target ===========================  */}
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={6}
          xs={12}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <FormControlLabel
            sx={checkBoxLabelStyle}
            control={
              <Checkbox
                sx={checkBoxLabelStyle}
                name="TARGET_PROFIT"
                onChange={(e) => handleAdvanced(e)}
                checked={legAdvanced.TARGET_PROFIT}
              />
            }
            label={
              <Typography sx={checkBoxLabelStyle}>Target Profit</Typography>
            }
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
              <MultipleSelect
                data={["Percent_%", "Point", "Spot_%", "Spot_pts"]}
                sx={{
                  bgcolor: legAdvanced.TARGET_PROFIT
                    ? Dashboard_table_colors.buttonPrimary
                    : primary_colors.blue,
                }}
                disabled={!legAdvanced.TARGET_PROFIT}
                value={target.type}
                onChange={(a) =>
                  setTarget((prev) => ({
                    ...prev,
                    type: a.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
              <InputField
                info={false}
                disabled={!legAdvanced.TARGET_PROFIT}
                value={target.value}
                onChange={(a) =>
                  setTarget((prev) => ({
                    ...prev,
                    value: a.target.value,
                  }))
                }
              />
            </Grid>
          </Box>
        </Grid>

        {/* ===================== sl ===========================  */}
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={6}
          xs={12}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <FormControlLabel
            sx={checkBoxLabelStyle}
            control={
              <Checkbox
                sx={checkBoxLabelStyle}
                checked={legAdvanced.STOP_LOSS}
                name="STOP_LOSS"
                onChange={(e) => handleAdvanced(e)}
              />
            }
            label={<Typography sx={checkBoxLabelStyle}>Stop Loss</Typography>}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
              <MultipleSelect
                data={["Percent_%", "Point", "Spot_%", "Spot_pts"]}
                sx={{
                  bgcolor: legAdvanced.STOP_LOSS
                    ? Dashboard_table_colors.buttonPrimary
                    : primary_colors.blue,
                }}
                disabled={!legAdvanced.STOP_LOSS}
                value={stopLoss.type}
                onChange={(a) =>
                  setStopLoss((prev) => ({
                    ...prev,
                    type: a.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
              <InputField
                info={false}
                disabled={!legAdvanced.STOP_LOSS}
                value={stopLoss.value}
                onChange={(a) =>
                  setStopLoss((prev) => ({
                    ...prev,
                    value: a.target.value,
                  }))
                }
              />
            </Grid>
          </Box>
        </Grid>

        {/* ===================== tsl ===========================  */}
        <Grid
          item
          xl={4}
          lg={4}
          md={4}
          sm={6}
          xs={12}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <FormControlLabel
            sx={checkBoxLabelStyle}
            control={
              <Checkbox
                checked={legAdvanced.TRAIL_STOP_LOSS}
                sx={checkBoxLabelStyle}
                name="TRAIL_STOP_LOSS"
                onChange={(e) => handleAdvanced(e)}
              />
            }
            label={<Typography sx={checkBoxLabelStyle}>Trail SL</Typography>}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <MultipleSelect
                data={["Point", "Percentage", "Spot"]}
                sx={{
                  bgcolor: legAdvanced.TRAIL_STOP_LOSS
                    ? Dashboard_table_colors.buttonPrimary
                    : primary_colors.blue,
                }}
                disabled={!legAdvanced.TRAIL_STOP_LOSS}
                name={"TRAIL_STOP_LOSS"}
                value={tsl.type}
                onChange={(a) =>
                  setTsl((prev) => ({
                    ...prev,
                    type: a.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <InputField
                info={false}
                disabled={!legAdvanced.TRAIL_STOP_LOSS}
                value={tsl.value1}
                onChange={(a) =>
                  setTsl((prev) => ({
                    ...prev,
                    value1: a.target.value,
                  }))
                }
              />
            </Grid>
            :
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <InputField
                info={false}
                disabled={!legAdvanced.TRAIL_STOP_LOSS}
                value={tsl.value2}
                onChange={(a) =>
                  setTsl((prev) => ({
                    ...prev,
                    value2: a.target.value,
                  }))
                }
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box m={2} />
      <Grid item xs={12} display={"flex"} justifyContent={"center"}>
        <Box>
          <IconButton onClick={() => deleteLeg(e, i)}>
            <DeleteIcon style={{ fontSize: "larger", color: "#d70808" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              const data = { ...e };
              delete data.legId;
              delete data.is_deleted;
              delete data.createdAt;
              delete data.updatedAt;
              setLegs((prev) => [...prev, data]);
            }}
          >
            <ContentCopyIcon style={{ color: "#f5f5f5" }} />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};
