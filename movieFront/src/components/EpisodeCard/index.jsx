import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import "./index.scss";

const EpisodeCard = ({ episode, backdrop }) => {
  return (
    <div className="episodeCard">
      {episode.still_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
          alt=""
        />
      ) : backdrop ? (
        <img src={`https://image.tmdb.org/t/p/original${backdrop}`} alt="" />
      ) : (
        <h2>No still</h2>
      )}
      <div className="episodeCard__content">
        <div className="episodeCard__header">
          <h3>
            S{episode.season_number}.E{episode.episode_number} {episode.name}
          </h3>
          <small>{episode.air_date}</small>
        </div>
        <div className="episodeCard__content">
          <p>{episode.overview}</p>
        </div>
        <div className="episodeCard__scoreRow">
          <div className="episodeCard__score">
            <p>
              <FontAwesomeIcon
                className="episodeCard__star--solid"
                icon={solidStar}
              />{" "}
              {episode.vote_average.toFixed(1)}/10 ({episode.vote_count})
            </p>
            <p>
              <FontAwesomeIcon
                className="episodeCard__star--regular"
                icon={regularStar}
              />{" "}
              Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
