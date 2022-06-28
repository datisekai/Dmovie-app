import { Box, Button } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import movie from "../../src/actions/movie";
import DetailVideo from "../../src/components/Detail/DetailVideo";
import Reviews from "../../src/components/Detail/Reviews";
import Similars from "../../src/components/Detail/Similars";
import Trallers from "../../src/components/Detail/Trallers";
import VideoCard from "../../src/components/Card/VideoCard";
import { IsBrowser } from "../../src/components/IsBrowser";
import MainLayout from "../../src/components/layout/MainLayout";
import WidthLayout from "../../src/components/layout/WidthLayout";
import Meta from "../../src/components/Meta";
import Title from "../../src/components/Title";
import { getMovie2Embed, IMAGE_500 } from "../../src/config";
import MovieDetailProps from "../../src/models/MovieDetailProps";
import Breadcrumb from "../../src/components/Breadcrumbs";

const Video: FC<MovieDetailProps> = ({ video, detail, similars, reviews }) => {
  const router = useRouter();

  const handleBackMovie = () => {
    router.push(`[id]`, `${router.query.id}`);
  };

  return (
    <>
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
      <Title
        title={
          detail.title ||
          detail.original_title ||
          detail.name ||
          detail.original_name
        }
      />
      <IsBrowser>
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
              <Box
                sx={{
                  width: {
                    md: "75%",
                    xs: "100%",
                  },
                }}
              >
                <VideoCard
                  keyVideo={
                    (router?.query?.key as string) ||
                    getMovie2Embed(router.query.id as string)
                  }
                />
                <DetailVideo data={detail} media_type='movie' />
                {router.query.key && (
                  <Button
                    onClick={handleBackMovie}
                    sx={{ mt: "10px" }}
                    variant='outlined'
                    size='large'
                  >
                    Back to Movie
                  </Button>
                )}
                {video.swipers && <Trallers data={video?.swipers} />}
                <Reviews data={reviews} media_type='tv' />
              </Box>
              <Similars data={similars} media_type='movie' />
            </Box>
          </WidthLayout>
        </MainLayout>
      </IsBrowser>
    </>
  );
};

export default Video;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string;
  const dataVideo = await movie.getTrallerById(movieId);
  const dataDetail = await movie.getMovieById(movieId);
  const dataSimilar = await movie.getSimilarMovie(movieId);
  const dataReview = await movie.getReviews(movieId);

  if (!dataDetail) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      video: {
        default: dataVideo.results[0],
        swipers: dataVideo.results.slice(1),
      },
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
