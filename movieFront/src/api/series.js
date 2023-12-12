import instance from "./config";

const topRatedSeries = () => {
  return instance.get("tv/top_rated");
};

const getTrending = () => {
  return instance.get("trending/tv/week");
};

export { topRatedSeries, getTrending };
