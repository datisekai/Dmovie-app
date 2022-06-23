import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { IMAGE_300 } from "../../config";
import ReviewCard from "../../models/ReviewCard";
import { calculateCreatedTime } from "../../utils/formatTime";
import FlexBox from "../FlexBox";

const ReviewCard: FC<ReviewCard> = ({ image, name, createdAt, content }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <FlexBox mt='10px'>
      <Avatar alt='Remy Sharp' src={`${(image && image.slice(1)) || ""}`} />
      <Box pl='10px'>
        <FlexBox alignItems={"center"}>
          <Typography fontWeight={500}>{name}</Typography>
          <Typography component={"span"} pl='10px' color={"#333"}>
            {calculateCreatedTime(createdAt)}
          </Typography>
        </FlexBox>
        <Typography component={"p"} mt='10px'>
          {content.length > 200
            ? showAll
              ? content
              : content.slice(0, 200) + "..."
            : content}
        </Typography>
        {content.length > 200 && (
          <Button
            onClick={() => setShowAll(!showAll)}
            size='small'
            variant='text'
          >
            {showAll ? "Thu gọn" : "Xem tất cả"}
          </Button>
        )}
      </Box>
    </FlexBox>
  );
};

export default ReviewCard;
