import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faFilm,
  faTv,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

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

  const link = (url) => {
    setMenu(false);
    navigate(url);
  };

  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__logoRow">
          <img
            onClick={() => goToHome()}
            src={`${import.meta.env.VITE_IMG_URL}/logo.png`}
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
          <p className="menu__link" onClick={() => link("/allMovies")}>
            All movies
          </p>
        </div>
        <div className="menu__seriesRow">
          <h2>
            <FontAwesomeIcon className="menu__icon2" icon={faTv} /> TV Shows
          </h2>
          <p className="menu__link" onClick={() => link("/allSeries")}>
            All series
          </p>
        </div>
        <div className="menu__aboutProyect">
          <h2>
            <FontAwesomeIcon className="menu__icon2" icon={faProjectDiagram} />{" "}
            About Project
          </h2>
          <p className="menu__link" onClick={() => link("/aboutProject")}>
            Know more...
          </p>
          <div className="menu__link2">
            <Link
              className="menu__link2"
              to={"https://www.linkedin.com/in/facundo-rinon/"}
              target="_blank"
            >
              Developer LinkedIn
            </Link>
          </div>
          <div className="menu__link2">
            <Link
              className="menu__link2"
              to={"https://web-portfolio-facundorinon.vercel.app/"}
              target="_blank"
            >
              Developer Portfolio
            </Link>
          </div>
          <div className="menu__link2">
            <Link
              className="menu__link2"
              to={"https://github.com/FacundoRinon"}
              target="_blank"
            >
              Developer Git hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
