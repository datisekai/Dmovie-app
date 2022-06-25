import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import { IMAGE_300 } from "../../config";
import OtherCard from "../../models/OtherCard";
import limitName from "../../utils/limitName";

const OtherCard: FC<OtherCard> = ({ image, title, id, media_type }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Link href={`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`}>
        <a>
          <img src={`${IMAGE_300}${image}`} id='otherCard' alt='' />
        </a>
      </Link>

      <Typography>{limitName(title)}</Typography>
    </Box>
  );
};

export default OtherCard;
