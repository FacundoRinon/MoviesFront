import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getMovieById } from "../../api/movies";
import { getSerieById } from "../../api/series";

import ElementsList from "../../components/ElementsList";
import Footer from "../../components/Footer";

import "./index.scss";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [favorites, setFavorites] = useState(null);
  const [scored, setScored] = useState(null);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favoritesData = await Promise.all(
          user.favoriteMovies.map(async (element) => {
            if (element.media === "tv") {
              const response = await getSerieById(element.element_id);
              return response.data;
            } else {
              const response = await getMovieById(element.element_id);
              return response.data;
            }
          })
        );
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      }
    };
    getFavorites();
  }, []);

  useEffect(() => {
    const getScored = async () => {
      try {
        const scoredData = await Promise.all(
          user.scored.map(async (element) => {
            if (element.media === "tv") {
              const response = await getSerieById(element.element_id);
              return response.data;
            } else {
              const response = await getMovieById(element.element_id);
              return response.data;
            }
          })
        );
        setScored(scoredData);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      }
    };
    getScored();
  }, []);

  console.log("favorites", favorites);
  console.log("scored", scored);

  return (
    <div className="profile">
      <div className="profile__backRow">
        <FontAwesomeIcon
          className="profile__backRow--element"
          icon={faArrowLeft}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="profile__header">
        <img src={`${import.meta.env.VITE_IMG_URL}/${user.avatar}`} alt="" />
        <div className="profile__headerData">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <div className="profile__edi">
            <p>Edit profile</p>
          </div>
        </div>
      </div>
      <div className="profile__watchlist">
        <h3>On your watchlist</h3>
        <ElementsList elements={favorites} />
      </div>
      <div className="profile__scored">
        <h3>Scored</h3>
        <ElementsList elements={scored} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
