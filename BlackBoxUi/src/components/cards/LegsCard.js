import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import MultipleSelect from '../elements/MultipleSelect'
import InputField from '../elements/InputField'
import { Dashboard_table_colors, primary_colors } from '../../controller/colors'
import TimePickers from '../elements/TimePickers'
import DropdownWithInput from '../elements/DropdownWithInput'
import {
  ATMpoint_Banknifty,
  ATMpoint_Other,
  buysell,
  callput,
} from "../../constant.js/inputdata";

const LegsCard = ({
  index,
  _grid,
  waitTrade,
  checkBoxLabelStyle,
  ORB,
  repeat,
}) => {
  const [tp, setTp] = useState(false);
  const [sl, setSl] = useState(false);
  const [tsl, setTsl] = useState(false);

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
    >
      <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
        <MultipleSelect label={"B/S"} data={buysell} />
      </Grid>
      <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
        <MultipleSelect label={"CE/PE"} data={callput} />
      </Grid>
      <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
        <InputField label={"Lots"} value={1} />
      </Grid>
      {/* <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
        <MultipleSelect
          label={"Strike Selection"}
          data={index !== "Banknifty" ? ATMpoint_Other : ATMpoint_Banknifty}
          // value={strikeSelection}
          // onChange={(e) => handleInput("strikeSelection", e, legs)}
        />
      </Grid> */}

      {/* ======================= wait & trade ===================== */}
      {/* {waitTrade && (
        <>
          <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
            <MultipleSelect data={["Percentage ", "Points", "Spot"]} />
          </Grid>
          <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
            <DropdownWithInput menulist={["↑", "↓"]} />
          </Grid>
        </>
      )} */}

      {/* ======================= ORB ===================== */}
      {/* {ORB && (
        <>
          <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
            <TimePickers label={"Start time"} value={"09:20"} />
          </Grid>
          <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
            <TimePickers label={"End time"} value={"21:00"} />
          </Grid>
          <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
            <MultipleSelect data={["High", "Low"]} label={"Entry on"} />
          </Grid>
        </>
      )}
      {repeat !== "none" && (
        <Grid item xl={_grid} lg={_grid} md={_grid} sm={6} xs={12}>
          <InputField label={`No of times (${repeat})`} />
        </Grid>
      )} */}
      <Grid container spacing={1} mt={1}>
        {/* ===================== Target ===========================  */}
        {/* <Grid
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
                checked={tp}
                sx={checkBoxLabelStyle}
                onChange={(e) => setTp(e.target.checked)}
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
                data={["Percent %", "Point", "Spot %", "Spot pts"]}
                sx={{
                  bgcolor: tp
                    ? Dashboard_table_colors.buttonPrimary
                    : primary_colors.blue,
                }}
                disabled={!tp}
              />
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
              <InputField info={false} disabled={!tp} />
            </Grid>
          </Box>
        </Grid> */}

        {/* ===================== sl ===========================  */}
        {/* <Grid
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
                checked={sl}
                sx={checkBoxLabelStyle}
                onChange={(e) => setSl(e.target.checked)}
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
                data={["Percent %", "Point", "Spot %", "Spot pts"]}
                sx={{
                  bgcolor: sl
                    ? Dashboard_table_colors.buttonPrimary
                    : primary_colors.blue,
                }}
                disabled={!sl}
              />
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
              <InputField info={false} disabled={!sl} />
            </Grid>
          </Box>
        </Grid> */}

        {/* ===================== tsl ===========================  */}
        {/* <Grid
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
                checked={tsl}
                sx={checkBoxLabelStyle}
                onChange={(e) => setTsl(e.target.checked)}
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
                  bgcolor: tsl
                    ? Dashboard_table_colors.buttonPrimary
                    : primary_colors.blue,
                }}
                disabled={!tsl}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <InputField info={false} disabled={!tsl} />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <InputField info={false} disabled={!tsl} />
            </Grid>
          </Box>
        </Grid> */}
      </Grid>
      <Box m={2} />
    </Grid>
  );
};

export default LegsCard