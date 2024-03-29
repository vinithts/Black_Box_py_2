import { Typography } from "@mui/material";
import React from "react";

const Text = ({ content, textStyle }) => {
  return <Typography sx={textStyle}>{content}</Typography>;
};

export default Text;
