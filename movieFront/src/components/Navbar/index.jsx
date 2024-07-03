import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faBars,
  faCaretDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import SearchList from "../SearchList/indec";
import Menu from "../Menu";
import { removeToken } from "../../redux/userSlice";

import "./index.scss";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const movies = useSelector((state) => state.movies);
  const series = useSelector((state) => state.series);

  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [movilSearch, setMovilSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [options, setOptions] = useState(false);

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

  const closeSearch = () => {
    setMovilSearch(false);
    setSearchResults([]);
    setSearchValue("");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(removeToken());
    navigate("/login");
  }

  function toggleMenu() {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }

  function toggleOptions() {
    if (options) {
      setOptions(false);
    } else {
      setOptions(true);
    }
  }

  function selectOption(url) {
    navigate(url);
    setOptions(false);
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar__content">
          <div className="navbar__leftItems">
            <FontAwesomeIcon
              className="navbar__bars"
              icon={faBars}
              onClick={() => toggleMenu()}
            />
            <img
              onClick={() => navigate("/")}
              src={`${import.meta.env.VITE_IMG_URL}/logo.png`}
              alt=""
            />
            <p className="navbar__menu" onClick={() => toggleMenu()}>
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
            {user ? (
              <p
                className="navbar__watchlist"
                onClick={() => navigate("/watchlist")}
              >
                <FontAwesomeIcon className="navbar__icon" icon={faPlus} />
                Watchlist
              </p>
            ) : (
              <p
                className="navbar__watchlist"
                onClick={() => navigate("/logIn")}
              >
                <FontAwesomeIcon className="navbar__icon" icon={faPlus} />
                Watchlist
              </p>
            )}
            <FontAwesomeIcon
              className="navbar__search"
              icon={faSearch}
              onClick={() => setMovilSearch(true)}
            />
            {user ? (
              <p className="navbar__user" onClick={() => toggleOptions(true)}>
                <img
                  src={`${import.meta.env.VITE_IMG_URL}/${user.avatar}`}
                  alt=""
                />
                {user.name}{" "}
                <FontAwesomeIcon className="navbar__down" icon={faCaretDown} />
              </p>
            ) : (
              <p className="navbar__login" onClick={() => navigate("/login")}>
                Log in
              </p>
            )}
          </div>
        </div>
        {movilSearch && (
          <div className="navbar__movilSearch">
            <input
              type="text"
              placeholder="Search IMDb"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <FontAwesomeIcon
              className="navbar__close"
              icon={faTimes}
              onClick={() => closeSearch()}
            />
          </div>
        )}
      </div>
      {options && (
        <div className="navbar__userMenu">
          <p onClick={() => selectOption("/aboutProject")}>About project</p>
          <p onClick={() => selectOption("/profile")}>Profile</p>
          <p onClick={() => selectOption("/watchlist")}>Watchlist</p>
          <p onClick={() => handleLogout()}>Sign Out</p>
        </div>
      )}
      <SearchList results={searchResults} setSearchValue={setSearchValue} />
      {menu && <Menu setMenu={setMenu} />}
    </>
  );
};

export default Navbar;
