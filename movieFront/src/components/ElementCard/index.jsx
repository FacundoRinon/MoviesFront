import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { toggleWatchlist } from "../../redux/userSlice";

import "./index.scss";

const ElementCard = ({ element, series }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);

  useEffect(() => {
    setAlreadyInWatchlist(
      user.favoriteMovies.some((movie) => movie.element_id === element.id)
    );
  }, [user.favoriteMovies, element.id]);

  const linkTo =
    element.media_type === "tv" || element.media_type === "Tv" || series
      ? `/series/${element.id}`
      : `/movies/${element.id}`;

  async function handleWatchList() {
    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/users/`,
      data: {
        user_id: user.id,
        element_id: element.id,
        media: series || element.media_type === "tv" ? "tv" : "movie",
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log("response del endpoint", response.data);
    dispatch(toggleWatchlist(response.data.favorites));
  }

  return (
    <div className="elementCard">
      <Link to={linkTo} className="link">
        <img
          src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
          alt=""
        />
      </Link>
      <div className="elementCard__info">
        <Link to={linkTo} className="link">
          <p>
            <FontAwesomeIcon className="elementCard__star" icon={faStar} />{" "}
            {element.vote_average.toFixed(1)}
          </p>
          {element.name && <p className="elementCard__name">{element.name}</p>}
          {element.title && (
            <p className="elementCard__name">{element.title}</p>
          )}
        </Link>
        {alreadyInWatchlist ? (
          <p
            className="elementCard__watchlistButton"
            onClick={() => handleWatchList()}
          >
            <FontAwesomeIcon className="elementCard__plus" icon={faPlus} />{" "}
            Delete
          </p>
        ) : (
          <p
            className="elementCard__watchlistButton"
            onClick={() => handleWatchList()}
          >
            <FontAwesomeIcon className="elementCard__plus" icon={faPlus} />{" "}
            Watchlist
          </p>
        )}
      </div>
    </div>
  );
};

export default ElementCard;
