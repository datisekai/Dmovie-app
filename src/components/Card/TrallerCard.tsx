import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { getImageYoutube } from "../../config";
import TrallerCard from "../../models/TrallerCard";
import limitName from "../../utils/limitName";

const TrallerCard: FC<TrallerCard> = ({ keyVideo, name, link }) => {
  return (
    <Box>
      <img
        src={!link ? getImageYoutube(keyVideo) : link}
        id='trallerCard'
      ></img>
      <Typography>{limitName(name)}</Typography>
    </Box>
  );
};

export default TrallerCard;
