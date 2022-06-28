import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { primary } from "../../theme/theme";
import FlexBox from "../FlexBox";
import ProducerDetail from "./ProducerDetail";

interface DetailVideoProps {
  data: any;
  media_type: string;
}

const DetailVideo: FC<DetailVideoProps> = ({ data, media_type }) => {
  const [showAll, setShowAll] = useState(false);
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
      <Typography mt='10px'>
        Release date: {data.release_date || data.first_air_date}
      </Typography>

      <FlexBox mt='10px' alignItems={"center"}>
        <Typography>Genres</Typography>
        <FlexBox alignItems={"center"} flexWrap='wrap'>
          {data.genres.map((item: any) => (
            <Link
              key={item.id}
              href={`/search?${media_type === "movie" ? "gm=" : "gt="}${
                item.id
              }`}
            >
              <a>
                <Typography
                  sx={{
                    ml: "10px",
                    px: "10px",
                    color: primary.main,
                  }}
                >
                  {item.name}
                </Typography>
              </a>
            </Link>
          ))}
        </FlexBox>
      </FlexBox>
      <Typography component={"p"} mt='10px'>
        {showAll ? data.overview : data.overview.slice(0, 220) + "..."}
      </Typography>
      {data.overview.length > 200 && (
        <Button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Thu gọn" : "Xem tất cả"}
        </Button>
      )}
    </Box>
  );
};

export default DetailVideo;
