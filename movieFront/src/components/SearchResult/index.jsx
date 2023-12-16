import React from "react";

import "./index.scss";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result, setSearchValue }) => {
  const navigate = useNavigate();

  const selectElement = () => {
    navigate(`/${result.media}/${result.id}`);
    setSearchValue([]);
  };

  return (
    <div onClick={() => selectElement()} className="searchResult">
      <div className="searchResult__pic">
        <img
          src={`https://image.tmdb.org/t/p/original${result.poster_path}`}
          alt=""
        />
      </div>
      <div className="searchResult__info">
        <h4>{result.title}</h4>
        <small>{result.vote_average}</small>
      </div>
    </div>
  );
};

export default SearchResult;
