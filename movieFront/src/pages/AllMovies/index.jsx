import React, { useEffect, useState } from "react";

import { getMovies } from "../../api/movies";
import Element from "../../components/Element";
import Spinner from "../../components/Spinner";

import "./index.scss";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [apiPage, setApiPage] = useState(1);

  const initHome = async () => {
    const response = await getMovies(apiPage);
    if (apiPage === 1) {
      setMovies(response.data.results);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    }
  };

  useEffect(() => {
    initHome();
  }, [apiPage]);

  return (
    <div className="allMovies">
      {movies.length > 0 ? (
        <div className="allMovies__container">
          <h1>All movies</h1>
          <div className="allMovies__movieList">
            {movies &&
              movies.map((movie) => (
                <Element key={movie.id} element={movie} type={"movies"} />
              ))}
          </div>
          <div className="allMovies__load">
            <button onClick={() => setApiPage(apiPage + 1)}>Load more</button>
          </div>
        </div>
      ) : (
        <div className="home__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AllMovies;
