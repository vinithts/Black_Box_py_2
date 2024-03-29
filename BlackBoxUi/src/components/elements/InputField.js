import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import React from "react";
import { primary_colors } from "../../controller/colors";
import { account_menu_font } from "../../controller/fontSize";
import { AiOutlineInfoCircle } from "react-icons/ai";

const customTextFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: primary_colors.white,
    },
    '&.Mui-focused fieldset': {
      borderColor: primary_colors.white,
    }, '& fieldset': {
      borderColor: primary_colors.white,
    },
    '& .MuiOutlinedInput-input': {
      color: primary_colors.white,
    },
  },
  '& .MuiInputLabel-root': {
    color: primary_colors.white,
    fontSize: account_menu_font.menuItems,
    '&.Mui-focused': {
      color: primary_colors.white,
    },
    borderColor: primary_colors.white,
  },
  "& .MuiSelect-icon": {
    color: primary_colors.white,
  },
};


const InputField = ({
  label,
  name,
  value,
  type,
  sx,
  size,
  info,
  onChange,
  disabled,
  multiline,
  rows,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      type={type}
      disabled={disabled}
      value={value}
      name={name}
      onChange={(e) => onChange(e)}
      multiline={multiline}
      rows={rows}
      sx={{
        ...sx,
        ...customTextFieldStyle,
      }}
      size={size ? size : "small"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {info !== false && (
              <Tooltip
                title="Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo."
                arrow
              >
                <IconButton>
                  <AiOutlineInfoCircle
                    style={{ cursor: "pointer", color: primary_colors.gray }}
                    size={18}
                  />
                </IconButton>
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputField;
