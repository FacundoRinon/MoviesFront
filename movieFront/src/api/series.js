import instance from "./config";

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

export { getSerieById, getSeriesVideosById, topRatedSeries, getTrending };
