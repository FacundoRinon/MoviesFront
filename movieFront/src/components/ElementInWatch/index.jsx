import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { getSerieById } from "../../api/series";
import { getMovieById } from "../../api/movies";
import { toggleWatchlist } from "../../redux/userSlice";

import "./index.scss";

const ElementInWatch = ({ element }) => {
  const user = useSelector((state) => state.user);
  const id = element.element_id;

  const [media, setMedia] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initHome = async () => {
      try {
        if (element.media === "tv") {
          const response = await getSerieById(id);
          setData(response.data);
          setMedia("series");
        } else {
          const response = await getMovieById(id);
          setData(response.data);
          setMedia("movies");
        }
      } catch (error) {
        console.log(error);
      }
    };
    initHome();
  }, [user.favoriteMovies]);

  async function handleWatchList() {
    const response = await axios({
      method: "PATCH",
      url: `${import.meta.env.VITE_API_URL}users/`,
      data: {
        user_id: user.id,
        element_id: id,
        media: element.media,
      },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    dispatch(toggleWatchlist(response.data.favorites));
  }

  return (
    <>
      {data && (
        <div className="elementInWatch">
          <img
            className="elementInWatch__img"
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt=""
          />
          <div className="elementInWatch__info">
            <div className="elementInWatch__header">
              <h3 onClick={() => navigate(`/${media}/${id}`)}>
                {data.title || data.name}
              </h3>
              <FontAwesomeIcon
                onClick={() => handleWatchList()}
                className="elementInWatch__trash"
                icon={faTrash}
              />
            </div>
            <small>{data.first_air_date || data.release_date}</small>
            {"|"}
            <small>
              <FontAwesomeIcon className="elementInWatch__star" icon={faStar} />{" "}
              {data.vote_average.toFixed(1)}
            </small>
            <p>{data.overview}</p>
            {data.genres.map((genre, index) => (
              <small key={index}>{genre.name}</small>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ElementInWatch;
