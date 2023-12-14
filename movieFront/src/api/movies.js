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

const getTopRated = () => {
  return instance.get(`movie/top_rated`);
};

const getTrendingMovies = () => {
  return instance.get(`trending/movie/week`);
};

const getMovieVideos = (movieId) => {
  return instance.get(`movie/${movieId}/videos`);
};

const getMovieImages = (movieId) => {
  return instance.get(`movie/${movieId}/images`);
};

const getMovieCast = (movieId) => {
  return instance.get(`movie/${movieId}/credits`);
};

export {
  getMovies,
  getMovieById,
  getPopularMovies,
  getUpcomingMovies,
  getTopRated,
  getTrendingMovies,
  getMovieVideos,
  getMovieImages,
  getMovieCast,
};
