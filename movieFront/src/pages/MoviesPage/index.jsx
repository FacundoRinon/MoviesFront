import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getMovieById } from "../../api/movies";

import "./index.scss";

const MoviesPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const initHome = async () => {
      try {
        const response = await getMovieById(id);
        console.log(response.data);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    initHome();
  }, []);
  return (
    <div className="moviesPage">
      <h1>Movies</h1>
    </div>
  );
};

export default MoviesPage;
