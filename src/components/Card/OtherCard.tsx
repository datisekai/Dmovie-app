import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import { IMAGE_300 } from "../../config";
import OtherCard from "../../models/OtherCard";
import limitName from "../../utils/limitName";
import FlexBox from "../FlexBox";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const OtherCard: FC<OtherCard> = ({ image, title, id, media_type }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Link href={`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`}>
        <a>
          <Box position={"relative"} className='otherCardHover'>
            <img src={`${IMAGE_300}${image}`} id='otherCard' alt='' />
            <FlexBox
              sx={{
                position: "absolute",
                bgcolor: "rgba(0, 0, 0, 0.616)",
                zIndex: "10",
                inset: 0,
                borderRadius: "10px",
                alignItems: "center",
                justifyContent: "center",
                display: "none",
                cursor: "pointer",
              }}
              id={"otherCardOverlay"}
            >
              <PlayCircleIcon
                fontSize='large'
                color='info'
                sx={{ zIndex: 15, cursor: "pointer" }}
              />
            </FlexBox>
          </Box>
        </a>
      </Link>

      <Link href={`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`}>
        <a>
          <Typography>{limitName(title)}</Typography>
        </a>
      </Link>
    </Box>
  );
};

export default OtherCard;
