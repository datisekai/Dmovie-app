import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import SimilarCard from "./SimilarCard";

interface SimilarsProps {
  data: any[];
}

const Similars: FC<SimilarsProps> = ({ data }) => {
  return (
    <Box
      px={{ md: "20px", xs: "0" }}
      pb={"10px"}
      pt='0px'
      sx={{
        width: {
          md: "25%",
          xs: "100%",
        },
      }}
    >
      <Typography
        borderBottom={"1px solid #ccc"}
        fontSize={"18px"}
        fontWeight='600'
        pb={"10px"}
      >
        Đề xuất cho bạn
      </Typography>
      {data?.map((item: any) => (
        <SimilarCard
          key={item.id}
          id={item.id}
          image={item.backdrop_path || item.poster_path}
          name={
            item.title ||
            item.original_title ||
            item.name ||
            item.original_name ||
            "Not found name"
          }
          vote={item.vote_average || 0}
        />
      ))}
    </Box>
  );
};

export default Similars;
