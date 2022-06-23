import { API_KEY } from "../config";
import axiosClient from "../config/axiosClient";

const movie = {
    getTrending:async(page = 1) => {
        const dataTrend = await axiosClient.get(
            `/trending/all/day?api_key=${API_KEY}&page=${page}`
          );

          return dataTrend.data;

    },
    getRated: async(page = 1) => {
        const dataRated = await axiosClient.get(`/movie/top_rated?api_key=${API_KEY}&page=${page}`);
        return dataRated.data;
    },
    getLatest:async(page = 1) => {
        const dataLatest = await axiosClient.get(`/movie/latest?api_key=${API_KEY}&page=${page}`)
        return dataLatest.data;
    },
    getPopular:async(page = 1) => {
        const dataPopular = await axiosClient.get(`/movie/popular?api_key=${API_KEY}&page=${page}`)
        return dataPopular.data;
    },
    getUpComing:async(page = 1) => {
        const dataUpComing = await axiosClient.get(`/movie/upcoming?api_key=${API_KEY}&page=${page}`) 
        return dataUpComing.data;
    },
    getMovieTrending:async(page = 1) => {
        const dataTrend = await axiosClient.get(
            `/trending/movie/day?api_key=${API_KEY}&page=${page}`
          );

          return dataTrend.data;
    },
    getNowPlaying:async(page = 1) => {
        const dataNowPlay = await axiosClient.get(`/movie/now_playing?api_key=${API_KEY}&page=${page}`) 
        return dataNowPlay.data;
    },
    getMovieById:async(id:string) => {
        const data = await axiosClient.get(`/movie/${id}?api_key=${API_KEY}`)
        return data.data;
    },
    getSimilarMovie:async(id:string) => {
        const data = await axiosClient.get(`/movie/${id}/similar?api_key=${API_KEY}&page=1`);
        return data.data;
    },
    getTrallerById:async(id:string) => {
        const data = await axiosClient.get(`/movie/${id}/videos?api_key=${API_KEY}`)
        return data.data;
    },
    getReviews:async(id:string) => {
        const data = await axiosClient.get(`/movie/${id}/reviews?api_key=${API_KEY}`);
        return data.data;
    }
}

export default movie;