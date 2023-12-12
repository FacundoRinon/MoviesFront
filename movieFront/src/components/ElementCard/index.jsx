import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

const ElementCard = ({ element }) => {
  return (
    <div className="elementCard">
      <img
        src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
        alt=""
      />
      <div className="elementCard__info">
        <p>
          <FontAwesomeIcon className="elementCard__star" icon={faStar} />{" "}
          {element.vote_average}
        </p>
        {element.name && <p className="elementCard__name">{element.name}</p>}
        {element.title && <p className="elementCard__name">{element.title}</p>}
        <p className="elementCard__watchlistButton">
          <FontAwesomeIcon className="elementCard__plus" icon={faPlus} />{" "}
          Watchlist
        </p>
      </div>
    </div>
  );
};

export default ElementCard;
