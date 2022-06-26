import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
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
          <img src={`${IMAGE_300}${image}`} id='similarCard' alt='' />

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
