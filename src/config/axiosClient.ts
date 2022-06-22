import axios from "axios";
import { MAIN_API } from ".";
const axiosClient = axios.create({
  baseURL: MAIN_API,
});

export default axiosClient;