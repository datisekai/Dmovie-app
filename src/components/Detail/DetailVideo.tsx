import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { primary } from "../../theme/theme";
import FlexBox from "../FlexBox";
import ProducerDetail from "./ProducerDetail";

interface DetailVideoProps {
  data: any;
}

const DetailVideo: FC<DetailVideoProps> = ({ data }) => {
  return (
    <Box mt='20px'>
      <Typography mt='10px' fontSize={"18px"} fontWeight='500'>
        {data.title ||
          data.original_title ||
          data.name ||
          data.original_name ||
          "Not found name"}
      </Typography>
      {data.belongs_to_collection && (
        <Box mt='10px'>
          <ProducerDetail
            image={
              data?.belongs_to_collection?.poster_path ||
              data?.belongs_to_collection?.backdrop_path
            }
            name={data?.belongs_to_collection?.name}
            id={data?.belongs_to_collection?.id.toString()}
          />
        </Box>
      )}
      <Typography mt='10px'>Release date: {data.release_date}</Typography>
      <FlexBox mt='10px' alignItems={"center"}>
        <Typography>Languages</Typography>
        {data.spoken_languages.map((item: any) => (
          <Typography
            sx={{
              px: "10px",
              bgcolor: primary.main,
              color: "white",
              ml: "10px",
              borderRadius: "10px",
            }}
            key={item.iso_639_1}
          >
            {item.english_name}
          </Typography>
        ))}
      </FlexBox>

      <FlexBox mt='10px' alignItems={"center"}>
        <Typography>Genres</Typography>
        {data.genres.map((item: any) => (
          <Typography
            sx={{
              ml: "10px",
              px: "10px",
              color: primary.main,
            }}
            key={item.id}
          >
            {item.name}
          </Typography>
        ))}
      </FlexBox>
      <Typography component={"p"} mt='10px'>
        {data.overview}
      </Typography>
    </Box>
  );
};

export default DetailVideo;
