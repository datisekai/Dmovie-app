interface Search {
  id: number;
  name: string;
}
export default interface SearchProps {
  genresMovie: Search[];
  genresTvShow: Search[];
  resultsMovie: any;
  resultsTv: any;
}
