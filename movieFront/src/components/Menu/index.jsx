import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faFilm,
  faTv,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const Menu = ({ setMenu }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    setMenu(false);
    navigate("/");
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__logoRow">
          <img
            onClick={() => goToHome()}
            src="../public/logo.png"
            alt=""
            className="menu__logo"
          />
          <FontAwesomeIcon
            className="menu__icon"
            icon={faTimes}
            onClick={() => closeMenu()}
          />
        </div>
        <div className="menu__movieRow">
          <h2>
            <FontAwesomeIcon className="menu__icon2" icon={faFilm} /> Movies
          </h2>
          <p className="menu__link">All movies</p>
        </div>
        <div className="menu__seriesRow">
          <h2>
            <FontAwesomeIcon className="menu__icon2" icon={faTv} /> TV Shows
          </h2>
          <p className="menu__link">All series</p>
        </div>
        <div className="menu__aboutProyect">
          <h2>
            <FontAwesomeIcon className="menu__icon2" icon={faProjectDiagram} />{" "}
            About Project
          </h2>
          <p className="menu__link">Know more...</p>
          <p className="menu__link">Developer LinkedIn</p>
          <p className="menu__link">Developer Portfolio</p>
          <p className="menu__link">Developer Git hub</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
