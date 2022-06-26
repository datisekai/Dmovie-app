import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IMAGE_500 } from "../config";
import TrendCard from "../models/TrendCard";
import { primary } from "../theme/theme";
import FlexBox from "./FlexBox";

const HomeCard: FC<TrendCard> = ({ image, title, id, vote, media_type }) => {
  const router = useRouter();

  const handleChangeRouter = (media_type: string, id: string) => {
    router.push(`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <img
        onClick={() => handleChangeRouter(media_type, id)}
        src={`${IMAGE_500}${image}`}
        id='homeCard'
        alt=''
      />

      <Link href={`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`}>
        <a>
          <FlexBox alignItems={"center"} justifyContent='space-between'>
            <Typography sx={{ flex: 1 }} fontWeight='500'>
              {title}
            </Typography>
            <Typography
              sx={{
                px: "10px",
                bgcolor: primary.main,
                borderRadius: "8px",
                color: "white",
              }}
            >
              {Number(vote).toFixed(1)}
            </Typography>
          </FlexBox>
        </a>
      </Link>
    </Box>
  );
};

export default HomeCard;
