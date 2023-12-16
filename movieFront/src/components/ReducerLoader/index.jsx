import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getMovies } from "../../api/movies";
import { setMovies } from "../../redux/moviesSlice";
import { getSeries } from "../../api/series";
import { setSeries } from "../../redux/seriesSlice";

const ReducerLoader = () => {
  const dispatch = useDispatch();
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const elements = async () => {
      try {
        const allMovies = [];
        const allSeries = [];

        for (let i = 1; i < 71; i++) {
          const response = await getMovies(i);
          console.log(response.data);
          const moviesOnPage = response.data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            media: "movies",
          }));

          const response2 = await getSeries(i);
          const seriesOnPage = response2.data.results.map((series) => ({
            id: series.id,
            title: series.name,
            poster_path: series.poster_path,
            vote_average: series.vote_average,
            media: "series",
          }));

          allMovies.push(...moviesOnPage);
          allSeries.push(...seriesOnPage);
        }
        dispatch(setMovies(allMovies));
        dispatch(setSeries(allSeries));
        setHasRun(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (!hasRun) {
      elements();
    }
  }, []);
};

export default ReducerLoader;
