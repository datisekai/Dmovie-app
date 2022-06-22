import { Box, Button } from "@mui/material";
import React from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { primary } from "../theme/theme";
import useScrollY from "../hooks/useScrollY";
const OnTop = () => {
  const scroll = useScrollY();

  const handleOnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      onClick={handleOnTop}
      style={{ display: scroll > 500 ? "block" : "none" }}
    >
      <ArrowCircleUpIcon
        sx={{
          position: "fixed",
          right: "20px",
          bottom: "50px",
          color: primary.main,
          cursor: "pointer",
          bgcolor: "white",
          borderRadius: "5px",
          transition: "0.3s linear",
        }}
        id='shadowBox'
        fontSize='large'
      />
    </div>
  );
};

export default OnTop;
