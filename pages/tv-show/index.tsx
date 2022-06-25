import { GetStaticProps, NextPage } from "next";
import React from "react";
import tv from "../../src/actions/tv";
import TV from "../../src/components/Home/TV";
import HomeLayout from "../../src/components/layout/HomeLayout";
import Title from "../../src/components/Title";

const TvShow: NextPage = ({ data }: any) => {
  const TVRender = [
    {
      url: "/tv-trend",
      title: "TV Trending",
      results: data.trend,
    },
    {
      url: "/airing-today",
      title: "TV AiringToday",
      results: data.airing,
    },
    {
      url: "/on-the-air",
      title: "TV OnTheAir",
      results: data.onTheAir,
    },
    {
      url: "/tv-popular",
      title: "TV Popular",
      results: data.tvPopular,
    },
    {
      url: "/tv-rated",
      title: "TV Rated",
      results: data.tvRated,
    },
  ];
  return (
    <HomeLayout>
      <Title />
      {TVRender?.map((item) => (
        <TV
          data={item.results}
          url={item.url}
          title={item.title}
          key={item.url}
        />
      ))}
    </HomeLayout>
  );
};

export default TvShow;
export const getStaticProps: GetStaticProps = async () => {
  const tvTrend = await tv.getTVTrending();
  const tvAiring = await tv.getAiringToday();
  const tvOta = await tv.getOntheAir();
  const tvPopular = await tv.getPopular();
  const tvRated = await tv.getRated();

  return {
    props: {
      data: {
        trend: tvTrend.results.slice(0, 6),
        airing: tvAiring.results.slice(0, 6),
        onTheAir: tvOta.results.slice(0, 6),
        tvPopular: tvPopular.results.slice(0, 6),
        tvRated: tvRated.results.slice(0, 6),
      },
    },
    revalidate: 60,
  };
};
