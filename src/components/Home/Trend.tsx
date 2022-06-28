import { Box, Grid } from "@mui/material";
import { FC } from "react";
import PropsData from "../../models/PropsData";
import FlexTitle from "../FlexTitle";
import HomeCard from "../Card/HomeCard";

const Trend: FC<PropsData> = ({ data }) => {
  return (
    <Box>
      <FlexTitle url='/trend' title='Trending' />
      <Box mt='10px'>
        <Grid container spacing={"10px"}>
          {data?.map((item: any, index: number) => (
            <Grid key={item.id} item xs={12} md={6} sm={6} lg={4}>
              <HomeCard
                id={item.id}
                title={
                  item.title ||
                  item.original_title ||
                  item.name ||
                  item.original_name
                }
                image={item.backdrop_path || item.poster_path}
                vote={item.vote_average.toString()}
                media_type={item.media_type}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Trend;
