import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import movie from "../src/actions/movie";
import tv from "../src/actions/tv";
import Breadcrumb from "../src/components/Breadcrumbs";
import categoryData from "../src/components/data/category";
import FlexBox from "../src/components/FlexBox";
import HomeCard from "../src/components/HomeCard";
import HomeLayout from "../src/components/layout/HomeLayout";

interface CategoryProps {
  data: any;
  category: {
    url: string;
    title: string;
  };
  page: number;
}

const Category: FC<CategoryProps> = ({ data, category, page }) => {
  const router = useRouter();

  return (
    <HomeLayout>
      <FlexBox
        alignItems={"center"}
        justifyContent='space-between'
        pb='10px'
        borderBottom={"1px solid #ccc"}
      >
        <Breadcrumb hasEndLink={category} />
        <Pagination
          count={data.total_pages}
          page={page}
          variant='outlined'
          color='primary'
          onChange={(e, page) => {
            router.push(
              `[category]?page=${page}`,
              `${category.url}?page=${page}`
            );
          }}
        />
      </FlexBox>
      <Box mt='10px'>
        <Grid container spacing={"10px"}>
          {data?.results?.map((item: any) => (
            <Grid item lg={4} key={item.id} md={6} xs={12}>
              <HomeCard
                id={item.id}
                image={item.backdrop_path || item.poster_path}
                title={
                  item.title ||
                  item.original_title ||
                  item.name ||
                  item.original_name ||
                  "Not found title"
                }
                vote={item.vote_average}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </HomeLayout>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const category = params && params.category;
  const page = Number(query.page) || 1;
  let data = [];
  switch (category) {
    case "trend":
      data = await movie.getTrending(page);
      break;
    case "rated":
      data = await movie.getRated(page);
      break;
    case "up-coming":
      data = await movie.getUpComing(page);
      break;
    case "popular":
      data = await movie.getPopular(page);
      break;
    case "airing-today":
      data = await tv.getAiringToday(page);
      break;
    case "on-the-air":
      data = await tv.getOntheAir(page);
      break;
    case "tv-popular":
      data = await tv.getPopular(page);
      break;
    case "movie-trend":
      data = await movie.getMovieTrending(page);
      break;
    case "now-playing":
      data = await movie.getNowPlaying(page);
      break;
    case "tv-trend":
      data = await tv.getTVTrending(page);
      break;
    case "tv-rated":
      data = await tv.getRated(page);
      break;
    default:
      return {
        notFound: true,
      };
  }

  return {
    props: {
      data,
      category: categoryData.find((item) => item.url === `/${category}`),
      page,
    },
  };
};
