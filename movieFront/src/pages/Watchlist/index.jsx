import React from "react";
import { useSelector } from "react-redux";

import ElementInWatch from "../../components/ElementInWatch";

import "./index.scss";

const Watchlist = () => {
  const user = useSelector((state) => state.user);

  return (
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
  );
};

export default Watchlist;
