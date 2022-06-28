import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { IMAGE_300 } from "../../config";
import SimilarMovieCard from "../../models/SimilarMovieCard";
import { primary } from "../../theme/theme";
import limitName from "../../utils/limitName";
import FlexBox from "../FlexBox";

const SimilarCard: FC<SimilarMovieCard> = ({
  id,
  image,
  name,
  vote,
  media_type,
}) => {
  return (
    <Link href={`/${media_type}/${id}`}>
      <a>
        <FlexBox mt='10px'>
          <Box position='relative' className='similarHover'>
            <img src={`${IMAGE_300}${image}`} id='similarCard' alt='' />
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
              id={"similarCardOverlay"}
            >
              <PlayCircleIcon
                fontSize='large'
                color='info'
                sx={{ zIndex: 15, cursor: "pointer" }}
              />
            </FlexBox>
          </Box>

          <Box pl='10px'>
            <Typography>{limitName(name)}</Typography>
            <Typography color={primary.main}>{vote.toFixed(2)}</Typography>
          </Box>
        </FlexBox>
      </a>
    </Link>
  );
};

export default SimilarCard;
