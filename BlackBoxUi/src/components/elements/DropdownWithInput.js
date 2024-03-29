import { FormControl, IconButton, InputAdornment, MenuItem, Select, TextField, Tooltip } from "@mui/material";
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


const DropdownWithInput = ({
  selectValue,
  textValue,
  textLable,
  selectLable,
  type,
  selectName,
  textname,
  displayValue,
  list,
  sx,
  size,
  onSelectChange,
  onTextChange,
  selectedValue,
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={textLable}
      type={type}
      name={textname}
      onChange={(e) => onTextChange(e)}
      value={textValue}
      sx={{
        ...sx,
        ...customTextFieldStyle,
      }}
      size={size ? size : "small"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FormControl variant="standard">
              <Select
                label={selectLable}
                size="small"
                value={selectValue}
                name={selectName}
                onChange={(e) => onSelectChange(e)}
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
                }}
              >
                {!displayValue
                  ? list.map((response) => (
                      <MenuItem value={response} sx={{ fontSize: ".8rem" }}>
                        {response}
                      </MenuItem>
                    ))
                  : list.map((response) => (
                      <MenuItem
                        value={response[selectedValue]}
                        sx={{ fontSize: ".8rem" }}
                      >
                        {`${response[displayValue]}`}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {
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
            }
          </InputAdornment>
        ),
      }}
    />
  );
};

export default DropdownWithInput;
