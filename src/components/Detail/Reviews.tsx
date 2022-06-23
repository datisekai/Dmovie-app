import { Box, Typography } from "@mui/material";
import React from "react";
import FlexBox from "../FlexBox";
import ReviewCard from "./ReviewCard";

const Reviews = ({ data }: any) => {
  return (
    <Box mt='10px'>
      <FlexBox pb='10px' alignItems={"center"} borderBottom={"1px solid #ccc"}>
        <Typography fontWeight={500} fontSize='18px'>
          Bình luận
        </Typography>
        <Typography pl='10px' fontWeight={500} fontSize='18px'>
          {data?.length}
        </Typography>
      </FlexBox>
      <Box>
        {data?.map((item: any, index: number) => (
          <ReviewCard
            key={index}
            content={item.content}
            createdAt={item.created_at}
            image={item.author_details.avatar_path}
            name={item.author}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Reviews;
