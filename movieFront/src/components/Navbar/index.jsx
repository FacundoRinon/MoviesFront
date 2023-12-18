import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faBars,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import SearchList from "../SearchList/indec";

import "./index.scss";

const Navbar = () => {
  const movies = useSelector((state) => state.movies);
  const series = useSelector((state) => state.series);

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchValue)
      );
      const filteredSeries = series.filter((series) =>
        series.title.toLowerCase().includes(searchValue)
      );
      setSearchResults([...filteredMovies, ...filteredSeries]);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <div className="navbar__content">
          <div className="navbar__leftItems">
            <FontAwesomeIcon className="navbar__bars" icon={faBars} />
            <img
              onClick={() => navigate("/")}
              src="../public/logo.png"
              alt=""
            />
            <p className="navbar__menu">
              <FontAwesomeIcon className="navbar__icon" icon={faBars} /> Menu
            </p>
            <input
              id="search"
              placeholder="Search IMDb"
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
          <div className="navbar__rightItems">
            <p className="navbar__watchlist">
              <FontAwesomeIcon className="navbar__icon" icon={faPlus} />
              Watchlist
            </p>
            <FontAwesomeIcon className="navbar__search" icon={faSearch} />
            <p className="navbar__user">
              <img
                src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
                alt=""
              />
              User{" "}
              <FontAwesomeIcon className="navbar__down" icon={faCaretDown} />
            </p>
          </div>
        </div>
      </div>
      <SearchList results={searchResults} setSearchValue={setSearchValue} />
    </>
  );
};

export default Navbar;
