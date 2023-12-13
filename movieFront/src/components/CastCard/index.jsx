import React from "react";

import "./index.scss";

const CastCard = ({ person }) => {
  console.log(person);
  return (
    <div className="castCard">
      {person.profile_path === null ? (
        <img
          src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
          alt=""
        />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
          className="castCard__photo"
        />
      )}
      <div className="castCard__info">
        <h3>{person.name}</h3>
        {person.character ? (
          <small>{person.character}</small>
        ) : (
          <small>{person.job}</small>
        )}
      </div>
    </div>
  );
};

export default CastCard;
