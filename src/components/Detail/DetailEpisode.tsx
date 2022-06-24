import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import DetailEpisode from "../../models/DetailEpisode";

const DetailEpisode: FC<DetailEpisode> = ({
  name,
  air_date,
  episode,
  overview,
  season,
}) => {
  return (
    <Box>
      <Typography mt='10px' fontWeight={500} fontSize='18px'>
        {name}
      </Typography>
      <Typography mt='10px'>Air date: {air_date}</Typography>
      <Typography mt='10px'>
        Season {season} | Episode {episode}
      </Typography>
      <Typography mt='10px' component={"p"}>
        {overview}
      </Typography>
    </Box>
  );
};

export default DetailEpisode;
