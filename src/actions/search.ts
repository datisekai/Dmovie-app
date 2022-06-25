import { API_KEY } from "./../config/index";
import axiosClient from "../config/axiosClient";

const search = {
  getMovieGenres: async (page = 1, id: string | undefined = undefined) => {
    const query = id
      ? `/discover/movie?api_key=${API_KEY}&language=vi&with_genres=${id}&page=${page}`
      : `/discover/movie?api_key=${API_KEY}&language=vi&page=${page}`;
    const data = await axiosClient.get(query);
    return data.data;
  },
  getTvGenres: async (page = 1, id: string | undefined = undefined) => {
    const query = id
      ? `/discover/tv?api_key=${API_KEY}&language=vi&with_genres=${id}&page=${page}`
      : `/discover/tv?api_key=${API_KEY}&language=vi&page=${page}`;

    const data = await axiosClient.get(query);
    return data.data;
  },
  getSearchByName: async (query: string) => {
    const data = await axiosClient.get(
      `/search/multi?api_key=${API_KEY}&language=vi&query=${query}`
    );
    return data.data;
  },
};

export default search;
