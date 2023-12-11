import instance from "./config";

const getTrending = () => {
  return instance.get("trending/tv/week");
};

export { getTrending };
