import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faBars,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__content">
        <div className="navbar__leftItems">
          <FontAwesomeIcon className="navbar__bars" icon={faBars} />
          <img src="../public/logo.png" alt="" />
          <p className="navbar__menu">
            <FontAwesomeIcon className="navbar__icon" icon={faBars} /> Menú
          </p>
          <input placeholder="Search IMDb" type="text" />
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
            User <FontAwesomeIcon className="navbar__down" icon={faCaretDown} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
