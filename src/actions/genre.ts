import { API_KEY } from "./../config/index";
import axiosClient from "../config/axiosClient";

const genre = {
  getGenreMovie: async () => {
    const data = await axiosClient.get(
      `/genre/movie/list?api_key=${API_KEY}&language=vi`
    );
    return data.data;
  },
  getGenreTvShow: async () => {
    const data = await axiosClient.get(
      `/genre/tv/list?api_key=${API_KEY}&language=vi`
    );
    return data.data;
  },
};

export default genre;
