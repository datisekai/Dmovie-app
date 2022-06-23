import { Box } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import movie from "../src/actions/movie";
import tv from "../src/actions/tv";
import Movie from "../src/components/Home/Movie";
import Trend from "../src/components/Home/Trend";
import TV from "../src/components/Home/TV";
import HomeLayout from "../src/components/layout/HomeLayout";
import Meta from "../src/components/Meta";
const Home: NextPage = ({ data }: any) => {
  const movieRender = [
    {
      url: "/rated",
      title: "Movie Rated",
      results: data.rated,
    },
    {
      url: "/up-coming",
      title: "Movie UpComing",
      results: data.upComing,
    },
    {
      url: "/popular",
      title: "Movie Popular",
      results: data.popular,
    },
  ];

  const TVRender = [
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
  ];

  return (
    <>
      <Meta
        image={`https://image.tmdb.org/t/p/w500/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg`}
        title={"Dmovie | Watch movie"}
        description={"This is a web watch movie"}
      />
      <HomeLayout>
        <Trend data={data.trend} />

        {movieRender?.map((item) => (
          <Movie
            data={item.results}
            url={item.url}
            title={item.title}
            key={item.url}
          />
        ))}
        {TVRender?.map((item) => (
          <TV
            data={item.results}
            url={item.url}
            title={item.title}
            key={item.url}
          />
        ))}
      </HomeLayout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const dataTrend = await movie.getTrending();
  const dataRated = await movie.getRated();
  const dataPopular = await movie.getPopular();
  const dataUpComing = await movie.getUpComing();

  const tvAiring = await tv.getAiringToday();
  const tvOta = await tv.getOntheAir();
  const tvPopular = await tv.getPopular();

  return {
    props: {
      data: {
        trend: dataTrend.results.slice(0, 6),
        rated: dataRated.results.slice(0, 6),
        upComing: dataUpComing.results.slice(0, 6),
        popular: dataPopular.results.slice(0, 6),
        airing: tvAiring.results.slice(0, 6),
        onTheAir: tvOta.results.slice(0, 6),
        tvPopular: tvPopular.results.slice(0, 6),
      },
    },
    revalidate: 60,
  };
};
