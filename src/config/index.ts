export const API_KEY = "b8e278156dce7136eb27699af4461d6c";

export const MAIN_API = "https://api.themoviedb.org/3";

export const IMAGE_500 = "https://image.tmdb.org/t/p/w500";
export const IMAGE_300 = "https://image.tmdb.org/t/p/w300";

export const getImageYoutube = (key: string) =>
  `https://i3.ytimg.com/vi/${key}/maxresdefault.jpg`;

export const getMovie2Embed = (id: string) =>
  `https://www.2embed.to/embed/tmdb/movie?id=${id}`;
export const getTvShow2Embed = (id: string, season: string, episode: string) =>
  `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`;
