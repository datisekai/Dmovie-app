import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { IMAGE_500 } from "../../config";
import TrendCard from "../../models/TrendCard";
import { primary } from "../../theme/theme";
import FlexBox from "../FlexBox";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const HomeCard: FC<TrendCard> = ({ image, title, id, vote, media_type }) => {
  const router = useRouter();

  const handleChangeRouter = (media_type: string, id: string) => {
    router.push(`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`);
  };

  return (
    <Box>
      <div
        style={{ position: "relative" }}
        onClick={() => handleChangeRouter(media_type, id)}
        className='homeCardHover'
      >
        <img src={`${IMAGE_500}${image}`} id='homeCard' alt='' />
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
          id={"homeCardOverlay"}
        >
          <PlayCircleIcon
            fontSize='large'
            color='info'
            sx={{ zIndex: 15, cursor: "pointer" }}
          />
        </FlexBox>
      </div>

      <Link href={`/${media_type === "movie" ? "movie" : "tv-show"}/${id}`}>
        <a>
          <FlexBox
            alignItems={"center"}
            justifyContent='space-between'
            mt='10px'
          >
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
