import { GetStaticProps, NextPage } from "next";
import movie from "../../src/actions/movie";
import Movie from "../../src/components/Home/Movie";
import HomeLayout from "../../src/components/layout/HomeLayout";
const MoviePage: NextPage = ({ data }: any) => {
  const movieRender = [
    {
      url: "/movie-trend",
      title: "Movie Trending",
      results: data.trend,
    },
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
    {
      url: "/now-playing",
      title: "Movie NowPlaying",
      results: data.nowPlaying,
    },
  ];
  return (
    <HomeLayout>
      {movieRender?.map((item) => (
        <Movie
          data={item.results}
          url={item.url}
          title={item.title}
          key={item.url}
        />
      ))}
    </HomeLayout>
  );
};

export default MoviePage;

export const getStaticProps: GetStaticProps = async () => {
  const dataTrend = await movie.getMovieTrending();
  const dataRated = await movie.getRated();
  const dataPopular = await movie.getPopular();
  const dataUpComing = await movie.getUpComing();
  const dataNowPlaying = await movie.getNowPlaying();

  return {
    props: {
      data: {
        trend: dataTrend.results.slice(0, 6),
        rated: dataRated.results.slice(0, 6),
        upComing: dataUpComing.results.slice(0, 6),
        popular: dataPopular.results.slice(0, 6),
        nowPlaying: dataNowPlaying.results.slice(0, 6),
      },
    },
    revalidate: 60,
  };
};
