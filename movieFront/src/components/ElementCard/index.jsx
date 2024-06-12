import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import ScoreModal from "../ScoreModal";
import LoginModal from "../LoginModal";
import { toggleWatchlist } from "../../redux/userSlice";

import "./index.scss";

const ElementCard = ({ element, series }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [alreadyInWatchlist, setAlreadyInWatchlist] = useState(false);
  const [modal, setModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [userScore, setUserScore] = useState(false);

  const toggleModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const toggleLoginModal = () => {
    if (loginModal) {
      setLoginModal(false);
    } else {
      setLoginModal(true);
    }
  };

  const linkTo =
    element.media_type === "tv" || element.media_type === "Tv" || series
      ? `/series/${element.id}`
      : `/movies/${element.id}`;

  if (user) {
    useEffect(() => {
      setAlreadyInWatchlist(
        user.favoriteMovies.some((movie) => movie.element_id == element.id)
      );
    }, [user.favoriteMovies]);

    useEffect(() => {
      const foundScore =
        user.scored &&
        user.scored.find(
          (score) =>
            score.element_id == element.id &&
            (score.media === element.media_type ||
              (score.media === "tv" && series))
        );
      if (foundScore) {
        setUserScore(foundScore.score);
      }
    }, [user]);
  }

  async function handleWatchList() {
    try {
      if (user) {
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
        dispatch(toggleWatchlist(response.data.favorites));
      } else {
        setLoginModal(true);
      }
    } catch (error) {
      console.error("Error occurred while handling watchlist:", error);
    }
  }

  return (
    <>
      <div className="elementCard">
        <Link to={linkTo} className="link">
          <img
            src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
            alt=""
          />
        </Link>
        <div className="elementCard__info">
          <p onClick={() => setModal(true)}>
            <FontAwesomeIcon className="elementCard__star" icon={faStar} />{" "}
            {element.vote_average.toFixed(1)}
            {!userScore ? (
              <FontAwesomeIcon
                className="elementCard__rate"
                icon={regularStar}
              />
            ) : (
              <FontAwesomeIcon className="elementCard__rate" icon={faStar} />
            )}{" "}
            {userScore}
          </p>

          <Link to={linkTo} className="link">
            {element.name && (
              <p className="elementCard__name">{element.name}</p>
            )}
            {element.title && (
              <p className="elementCard__name">{element.title}</p>
            )}
          </Link>
          {alreadyInWatchlist ? (
            <p
              className="elementCard__watchlistButton--out"
              onClick={() => handleWatchList()}
            >
              <FontAwesomeIcon className="elementCard__minus" icon={faMinus} />{" "}
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
      {modal && (
        <div className="modalContainer">
          <ScoreModal
            element={element}
            toggleModal={toggleModal}
            series={series}
            setUserScore={setUserScore}
            setModal={setModal}
          />
        </div>
      )}
      {loginModal && (
        <div className="modalContainer">
          <LoginModal
            setLoginModal={setLoginModal}
            toggleLoginModal={toggleLoginModal}
          />
        </div>
      )}
    </>
  );
};

export default ElementCard;
