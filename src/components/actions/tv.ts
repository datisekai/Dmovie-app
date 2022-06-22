import { API_KEY } from "../../config";
import axiosClient from "../../config/axiosClient";
const tv = {
    getAiringToday:async (page = 1) => {
        const dataAtd = await axiosClient.get(`/tv/airing_today?api_key=${API_KEY}&page=${page}`);
        return dataAtd.data;
    },
    getOntheAir:async(page = 1) => {
        const dataOta = await axiosClient.get(`/tv/on_the_air?api_key=${API_KEY}&page=${page}`)
        return dataOta.data;
    },
    getPopular:async(page = 1) => {
        const dataPopular = await axiosClient.get(`/tv/popular?api_key=${API_KEY}&page=${page}`);
        return dataPopular.data;
    },
    getTVTrending:async(page = 1) => {
        const dataTrend = await axiosClient.get(
            `/trending/tv/day?api_key=${API_KEY}&page=${page}`
          );

          return dataTrend.data;
    },
    getRated: async(page = 1) => {
        const dataRated = await axiosClient.get(`/tv/top_rated?api_key=${API_KEY}&page=${page}`);
        return dataRated.data;
    },

}

export default tv;