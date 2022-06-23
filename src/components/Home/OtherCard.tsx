import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import { IMAGE_300 } from "../../config";
import OtherCard from "../../models/OtherCard";

const OtherCard: FC<OtherCard> = ({ image, title, id, media_type }) => {
  return (
    <Box>
      <Link href={`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`}>
        <a>
          <img src={`${IMAGE_300}${image}`} id='otherCard' alt='' />
        </a>
      </Link>
      <Typography>{title}</Typography>
    </Box>
  );
};

export default OtherCard;
