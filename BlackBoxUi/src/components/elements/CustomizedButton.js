import { Button } from "@mui/material";
import React from "react";

const CustomizedButton = ({ variant, value, customizedStyles, size, onClick }) => {
  return (
    <Button
      fullWidth
      type="submit"
      variant={variant ? variant : "contained"}
      onClick={onClick}
      sx={{
        ...customizedStyles,
        textTransform: "capitalize",
      }}
      size={size ? size : "medium"}
    >
      {value}
    </Button>
  );
};

export default CustomizedButton;
