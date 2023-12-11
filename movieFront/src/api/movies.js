import instance from "./config";

const getMovies = (pageNumber) => {
  return instance.get("discover/movie", { params: { page: pageNumber } });
};

const getMovieById = (movieId) => {
  return instance.get(`movie/${movieId}`);
};

const getPopularMovies = () => {
  return instance.get(`movie/popular`);
};

const getUpcomingMovies = () => {
  return instance.get(`movie/upcoming`);
};

export { getMovies, getMovieById, getPopularMovies, getUpcomingMovies };
