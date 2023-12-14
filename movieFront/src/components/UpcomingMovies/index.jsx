import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

const UpcomingMovies = ({ list }) => {
  const [selectedMovie, setSelectedMovie] = useState(0);

  const decreaseSelected = () => {
    if (selectedMovie !== 0) {
      setSelectedMovie(selectedMovie - 1);
    } else {
      setSelectedMovie(list.length - 5);
    }
  };

  const increaseSelected = () => {
    if (selectedMovie !== 15) {
      setSelectedMovie(selectedMovie + 1);
    } else {
      setSelectedMovie(0);
    }
  };

  return (
    <div className="upcomingMovies">
      <div className="upcomingMovies__selectedMovie">
        <div className="upcomingMovies__changeRow">
          <FontAwesomeIcon
            className="upcomingMovies__chevron"
            icon={faChevronLeft}
            onClick={() => decreaseSelected()}
          />
          <FontAwesomeIcon
            className="upcomingMovies__chevron"
            icon={faChevronRight}
            onClick={() => increaseSelected()}
          />
        </div>
        {`${list[selectedMovie].backdrop_path}` !== "null" ? (
          <img
            src={`https://image.tmdb.org/t/p/original${list[selectedMovie].backdrop_path}`}
            alt=""
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${list[selectedMovie].poster_path}`}
            alt=""
            className="upcomingMovies__noBackdrop"
          />
        )}
        <div className="upcomingMovies__selectedInfo">
          {`${list[selectedMovie].poster_path}` !== "null" ||
          !`${list[selectedMovie].poster_path}` ? (
            <img
              src={`https://image.tmdb.org/t/p/original${list[selectedMovie].poster_path}`}
              alt=""
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${list[selectedMovie].backdrop_path}`}
              alt=""
            />
          )}
          <div className="upcomingMovies__info">
            <h2>{list[selectedMovie].title}</h2>
            <p>Realese date: {list[selectedMovie].release_date}</p>
          </div>
        </div>
      </div>
      <div className="upcomingMovies__nextMovies">
        <p>Up next</p>
        <div
          onClick={() => setSelectedMovie(selectedMovie + 1)}
          className="upcomingMovies__nextMovie"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${
              list[selectedMovie + 1].poster_path
            }`}
            alt=""
          />
          <div className="upcomingMovies__nextInfo">
            <h4>{list[selectedMovie + 1].title}</h4>
            <small>{list[selectedMovie + 1].release_date}</small>
          </div>
        </div>
        <div
          onClick={() => setSelectedMovie(selectedMovie + 2)}
          className="upcomingMovies__nextMovie"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${
              list[selectedMovie + 2].poster_path
            }`}
            alt=""
          />
          <div className="upcomingMovies__nextInfo">
            <h4>{list[selectedMovie + 2].title}</h4>
            <small>{list[selectedMovie + 2].release_date}</small>
          </div>
        </div>
        <div
          onClick={() => setSelectedMovie(selectedMovie + 3)}
          className="upcomingMovies__nextMovie"
        >
          <img
            src={`https://image.tmdb.org/t/p/original${
              list[selectedMovie + 3].poster_path
            }`}
            alt=""
          />
          <div className="upcomingMovies__nextInfo">
            <h4>{list[selectedMovie + 3].title}</h4>
            <small>{list[selectedMovie + 3].release_date}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovies;
