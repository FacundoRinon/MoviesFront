import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import {
  faTimes,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { addScore, deleteScore } from "../../redux/userSlice";

import "./index.scss";

const ScoreModal = ({
  element,
  toggleModal,
  series,
  setUserScore,
  setModal,
}) => {
  const user = useSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(0);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMouseEnter = (starNumber) => () => {
    setIsHovered(starNumber);
  };

  if (user) {
    useEffect(() => {
      const foundScore =
        user.scored &&
        user.scored.find((score) => score.element_id == element.id);
      if (foundScore) {
        setScore(foundScore.score);
      }
    }, []);
  }

  async function handleScore() {
    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}/movie/`,
      data: {
        user_id: user.id,
        element_id: element.id,
        media: series || element.media_type === "tv" ? "tv" : "movie",
        score: score,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setUserScore(response.data.newScore.score);
    dispatch(
      addScore({
        score: score,
        element_id: element.id,
        media: series || element.media_type === "tv" ? "tv" : "movie",
      })
    );
    setModal(false);
  }

  async function handleDeleteScore() {
    // const response = await axios({
    //   method: "DELETE",
    //   url: `${import.meta.env.VITE_API_URL}/movie/${element.id}`,
    //   data: {
    //     user_id: user.id,
    //     element_id: element.id,
    //     media: series || element.media_type === "tv" ? "tv" : "movie",
    //     score: score,
    //   },
    //   headers: {
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // });
    dispatch(
      deleteScore({
        score: score,
        element_id: element.id,
        media: series || element.media_type === "tv" ? "tv" : "movie",
      })
    );
    setModal(false);
  }

  return (
    <>
      <div className="modal">
        <div className="modal__bigStarContainer">
          <FontAwesomeIcon className="modal__bigStar" icon={solidStar} />
          <p className="modal__scorePts">{score}</p>
        </div>
        <div className="modal__closeContainer">
          <FontAwesomeIcon
            className="modal__close"
            icon={faTimes}
            onClick={() => toggleModal()}
          />
        </div>
        <div className="modal__bigBlock">
          <p className="modal__text">RATE THIS</p>
          <h3>{element.name || element.title}</h3>
          <div className="score">
            <FontAwesomeIcon
              className={
                isHovered >= 1 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(1)}
              onClick={() => setScore(1)}
              icon={isHovered >= 1 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 2 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(2)}
              onClick={() => setScore(2)}
              icon={isHovered >= 2 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 3 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(3)}
              onClick={() => setScore(3)}
              icon={isHovered >= 3 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 4 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(4)}
              onClick={() => setScore(4)}
              icon={isHovered >= 4 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 5 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(5)}
              onClick={() => setScore(5)}
              icon={isHovered >= 5 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 6 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(6)}
              onClick={() => setScore(6)}
              icon={isHovered >= 6 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 7 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(7)}
              onClick={() => setScore(7)}
              icon={isHovered >= 7 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 8 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(8)}
              onClick={() => setScore(8)}
              icon={isHovered >= 8 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 9 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(9)}
              onClick={() => setScore(9)}
              icon={isHovered >= 9 ? solidStar : regularStar}
            />
            <FontAwesomeIcon
              className={
                isHovered >= 10 ? "score__icon--covered" : "score__icon"
              }
              onMouseEnter={handleMouseEnter(10)}
              onClick={() => setScore(10)}
              icon={isHovered === 10 ? solidStar : regularStar}
            />
          </div>
          {user ? (
            <button onClick={() => handleScore()} className="modal__button">
              Rate
            </button>
          ) : (
            <button
              onClick={() => navigate("/logIn")}
              className="modal__button"
            >
              Log in
            </button>
          )}
          {score != 0 && (
            <p className="modal__button2" onClick={() => handleDeleteScore()}>
              Delete score
            </p>
          )}
        </div>
      </div>
    </>
  );
};

ScoreModal.propTypes = {
  setScore: PropTypes.func,
};

export default ScoreModal;
