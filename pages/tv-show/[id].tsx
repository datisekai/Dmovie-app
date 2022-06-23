import { Box } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import VideoCard from "../../src/components/Detail/VideoCard";
import MainLayout from "../../src/components/layout/MainLayout";
import WidthLayout from "../../src/components/layout/WidthLayout";

const Video = () => {
  return (
    <MainLayout>
      <WidthLayout>
        <Box p='20px' sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <VideoCard />
          </Box>
        </Box>
      </WidthLayout>
    </MainLayout>
  );
};

export default Video;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const movieId = params?.id as string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
