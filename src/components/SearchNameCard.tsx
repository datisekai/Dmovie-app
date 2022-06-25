import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { IMAGE_300 } from "../config";
import SearchNameCard from "../models/SearchNameCard";
import limitName from "../utils/limitName";
import FlexBox from "./FlexBox";

const SearchNameCard: FC<SearchNameCard> = ({
  date,
  image,
  media_type,
  name,
}) => {
  return (
    <FlexBox alignItems={"center"}>
      <img src={`${IMAGE_300}${image}`} alt={name} id='searchNameCard'></img>
      <Box sx={{ flex: 1, pl: "10px" }}>
        <Typography fontSize='13px' fontWeight={500}>
          {limitName(name)}
        </Typography>
        <Typography fontSize='13px' fontWeight={300}>
          {date}
        </Typography>

        <Typography fontSize='13px' fontWeight={300}>
          {media_type === "movie" ? "Movie" : "Tv Show"}
        </Typography>
      </Box>
    </FlexBox>
  );
};

export default SearchNameCard;
