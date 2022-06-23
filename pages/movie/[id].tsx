import { Box } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import movie from "../../src/actions/movie";
import DetailVideo from "../../src/components/Detail/DetailVideo";
import Reviews from "../../src/components/Detail/Reviews";
import Similars from "../../src/components/Detail/Similars";
import VideoCard from "../../src/components/Detail/VideoCard";
import { IsBrowser } from "../../src/components/IsBrowser";
import MainLayout from "../../src/components/layout/MainLayout";
import WidthLayout from "../../src/components/layout/WidthLayout";
import Meta from "../../src/components/Meta";
import { IMAGE_500 } from "../../src/config";
import MovieDetailProps from "../../src/models/MovieDetailProps";

const Video: FC<MovieDetailProps> = ({ video, detail, similars, reviews }) => {
  return (
    <IsBrowser>
      <Meta
        image={`${IMAGE_500}${detail.backdrop_path}`}
        title={
          detail.title ||
          detail.original_title ||
          detail.name ||
          detail.original_name
        }
        description={detail.overview}
      />
      <MainLayout>
        <WidthLayout>
          <Box
            p='20px'
            sx={{
              display: "flex",
              flexDirection: {
                md: "row",
                xs: "column",
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <VideoCard keyVideo={video.key} />
              <DetailVideo data={detail} />
              <Reviews data={reviews} />
            </Box>
            <Similars data={similars} />
          </Box>
        </WidthLayout>
      </MainLayout>
    </IsBrowser>
  );
};

export default Video;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string;
  const dataVideo = await movie.getTrallerById(movieId);
  const dataDetail = await movie.getMovieById(movieId);
  const dataSimilar = await movie.getSimilarMovie(movieId);
  const dataReview = await movie.getReviews(movieId);

  return {
    props: {
      video: dataVideo.results[0],
      detail: dataDetail,
      similars: dataSimilar.results,
      reviews: dataReview.results,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
