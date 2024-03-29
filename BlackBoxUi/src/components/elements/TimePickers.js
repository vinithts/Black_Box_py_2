import { TextField } from '@mui/material'
import React from 'react'
import { primary_colors } from '../../controller/colors'
import { account_menu_font } from '../../controller/fontSize';

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

const TimePickers = ({ label, value, onChange, name }) => {
  return (
    <TextField
      label={label}
      type="time"
      fullWidth
      size="small"
      name={name}
      onChange={(e) =>
        onChange({ target: { name: name, value: e.target.value } })
      }
      sx={{
        ...customTextFieldStyle,
      }}
      value={value}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 1,
      }}
    />
  );
};

export default TimePickers