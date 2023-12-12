import axios from "axios";

export default axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  params: {
    api_key: `a13868fb191bef7dcceff08678dde5f1`,
  },
});
