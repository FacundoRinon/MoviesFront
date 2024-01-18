import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const Element = ({ element, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${element.id}`);
  };

  return (
    <div className="element" onClick={handleClick}>
      <img
        src={`https://image.tmdb.org/t/p/original${element.poster_path}`}
        alt=""
        className="element__img"
      />
      <p>
        {element.title} {element.name}
      </p>
    </div>
  );
};

export default Element;
