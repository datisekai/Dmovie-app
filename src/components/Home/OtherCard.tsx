import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import { IMAGE_300 } from "../../config";
import OtherCard from "../../models/OtherCard";

const OtherCard: FC<OtherCard> = ({ image, title, id }) => {
  return (
    <Box>
      <Link href={`/video/${id}`}>
        <a>
          <img src={`${IMAGE_300}${image}`} id='otherCard' alt='' />
        </a>
      </Link>
      <Typography>{title}</Typography>
    </Box>
  );
};

export default OtherCard;
