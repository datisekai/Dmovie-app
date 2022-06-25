import { Box } from "@mui/material";
import { GetServerSideProps, GetStaticProps } from "next";
import { FC } from "react";
import genre from "../src/actions/genre";
import search from "../src/actions/search";
import HomeLayout from "../src/components/layout/HomeLayout";
import GenresMovie from "../src/components/Search/GenresMovie";
import GenresTv from "../src/components/Search/GenresTv";
import Results from "../src/components/Search/Results";
import Title from "../src/components/Title";
import SearchProps from "../src/models/SearchProps";

const Search: FC<SearchProps> = ({
  genresMovie,
  genresTvShow,
  resultsMovie,
  resultsTv,
}) => {
  return (
    <HomeLayout>
      <Title title='Dmovie | Search' />
      <Box>
        <GenresMovie title='Movie' data={genresMovie} />
      </Box>
      <Box mt='20px'>
        <GenresTv title='TV Show' data={genresTvShow} />
      </Box>
      <Box mt='20px'>
        <Results data={resultsMovie.results} title='Movie' media_type='movie' />
      </Box>
      <Box mt='20px'>
        <Results
          data={resultsTv.results}
          title='TV Show'
          media_type='tv-show'
        />
      </Box>
    </HomeLayout>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const gt = query?.gt as string;
  const gm = query?.gm as string;

  const genresMovie = await genre.getGenreMovie();
  const genresTvShow = await genre.getGenreTvShow();
  const resultsMovie = await search.getMovieGenres(1, gm);
  const resultsTv = await search.getTvGenres(1, gt);

  return {
    props: {
      genresMovie: genresMovie.genres,
      genresTvShow: genresTvShow.genres,
      resultsMovie: resultsMovie,
      resultsTv: resultsTv,
    },
  };
};
