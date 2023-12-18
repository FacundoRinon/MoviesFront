import instance from "./config";

const getSeries = (pageNumber) => {
  return instance.get("discover/tv", { params: { page: pageNumber } });
};

const getSerieById = (serieId) => {
  return instance.get(`tv/${serieId}`);
};

const getSeriesVideosById = (seriesId) => {
  return instance.get(`tv/${seriesId}/videos`);
};

const topRatedSeries = () => {
  return instance.get("tv/top_rated");
};

const getTrending = () => {
  return instance.get("trending/tv/week");
};

const getSeriesImages = (seriesId) => {
  return instance.get(`tv/${seriesId}/images`);
};

const getSeriesCast = (seriesId) => {
  return instance.get(`tv/${seriesId}/credits`);
};

const getSeason = (seriesId, season) => {
  return instance.get(`tv/${seriesId}/season/${season}`);
};

export {
  getSeries,
  getSerieById,
  getSeriesVideosById,
  topRatedSeries,
  getTrending,
  getSeriesImages,
  getSeriesCast,
  getSeason,
};
