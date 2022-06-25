import { Box, Button, Grid, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import OtherCard from "../Home/OtherCard";

interface ResultsProps {
  title: string;
  data: any[];
  media_type: string;
}

const Results: FC<ResultsProps> = ({ title, data, media_type }) => {
  const [showAll, setShowAll] = useState(false);
  const [results, setResults] = useState(data);

  useEffect(() => {
    if (showAll) {
      setResults(data);
    } else {
      setResults(data.slice(0, 5));
    }
  }, [data, showAll]);

  return (
    <Box>
      <Typography fontWeight={500} fontSize='18px' mt='10px'>
        Results {title}
      </Typography>

      <Grid container spacing={"10px"} mt='10px'>
        {results?.map((item: any) => (
          <Grid key={item.id} item xs={6} md={3} lg={2.4}>
            <OtherCard
              id={item.id}
              image={item.poster_path || item.backdrop_path}
              media_type={media_type}
              title={
                item.title ||
                item.original_title ||
                item.name ||
                item.original_name
              }
            />
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => setShowAll(!showAll)}
        sx={{ mt: "10px" }}
        variant='outlined'
      >
        {showAll ? "Thu gọn" : "Xem tất cả"}
      </Button>
    </Box>
  );
};

export default Results;
