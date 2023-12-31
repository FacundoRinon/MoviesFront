import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import ElementInWatch from "../../components/ElementInWatch";

import "./index.scss";

const Watchlist = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="backRow">
        <FontAwesomeIcon
          className="backRow__element"
          icon={faArrowLeft}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="watchlist">
        <div className="watchlist__container">
          <div className="watchlist__header">
            <h1>Your Watchlist</h1>
            <small>Private</small>
            <p>{user.favoriteMovies.length} Titles</p>
            {user.favoriteMovies.map((element, index) => (
              <ElementInWatch element={element} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
