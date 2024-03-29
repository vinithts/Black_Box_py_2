import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
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

const DatePickers = ({ label, value, onChange, name }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        format="dd/MM/yyyy"
        value={value}
        name={name}
        onChange={(e) =>
          onChange({
            target: {
              value: e,
              name: name,
            },
          })
        }
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-input": {
            height: "0.5em",
          },
          ...customTextFieldStyle,
          "& .MuiSvgIcon-root": {
            color: primary_colors.gray,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickers;