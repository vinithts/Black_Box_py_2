import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import PropTypes from "prop-types";
import { primary_colors } from "../../controller/colors";
import { account_menu_font } from "../../controller/fontSize";

export default function MultipleSelect({
  label,
  name,
  value,
  data,
  onChange,
  sx,
  disabled,
  keys,
  required,
}) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel
        id="demo-simple-select-label"
        style={{
          color: primary_colors.white,
          fontSize: account_menu_font.menuItems,
        }} // Decrease font size
      >
        {label}
      </InputLabel>
      {keys ? (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          name={name}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e)}
          required={required}
          sx={{
            color: primary_colors.white,
            "& .MuiSelect-root": {
              "&:focus": {
                backgroundColor: "transparent",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
            "& .MuiInputLabel-root": {
              color: primary_colors.white,
              "&.Mui-focused": {
                color: primary_colors.white,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: primary_colors.white,
            },
            "& .MuiSelect-icon": {
              color: primary_colors.white,
            },
            ...sx,
          }}
        >
          {data?.map((e) => (
            <MenuItem value={e[keys[1]]} key={e[keys[1]]}>
              {e[keys[0]]}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          name={name}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e)}
          sx={{
            color: primary_colors.white,
            "& .MuiSelect-root": {
              "&:focus": {
                backgroundColor: "transparent",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
            "& .MuiInputLabel-root": {
              color: primary_colors.white,
              "&.Mui-focused": {
                color: primary_colors.white,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: primary_colors.white,
            },
            "& .MuiSelect-icon": {
              color: primary_colors.white,
            },
            ...sx,
          }}
        >
          {data?.map((e) => (
            <MenuItem value={e}>{e}</MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}

MultipleSelect.propTypes = {
  label: PropTypes.string,
  customizedStyles: PropTypes.object,
  data: PropTypes.array
};
