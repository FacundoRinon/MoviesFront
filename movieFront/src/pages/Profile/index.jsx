import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getMovieById } from "../../api/movies";
import { getSerieById } from "../../api/series";

import ElementsList from "../../components/ElementsList";
import EditProfile from "../../components/EditProfile";
import Footer from "../../components/Footer";

import "./index.scss";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(null);
  const [scored, setScored] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favoritesData = await Promise.all(
          user.favoriteMovies.map(async (element) => {
            if (element.media === "tv") {
              const response = await getSerieById(element.element_id);
              const updatedElement = {
                ...response.data,
                media_type: element.media,
              };

              return updatedElement;
            } else {
              const response = await getMovieById(element.element_id);
              const updatedElement = {
                ...response.data,
                media_type: element.media,
              };

              return updatedElement;
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
              const updatedElement = {
                ...response.data,
                media_type: element.media,
              };
              return updatedElement;
            } else {
              const response = await getMovieById(element.element_id);
              const updatedElement = {
                ...response.data,
                media_type: element.media,
              };

              return updatedElement;
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

  return (
    <>
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

            <button className="profile__edi" onClick={() => setModal(true)}>
              Edit profile
            </button>
          </div>
        </div>
        <div className="profile__watchlist">
          {user.favoriteMovies.length > 0 ? (
            <h3>On your watchlist</h3>
          ) : (
            <h3>Add content to your Watchlist</h3>
          )}
          <ElementsList elements={favorites} />
        </div>
        {user.scored.length > 0 && (
          <div className="profile__scored">
            <h3>Your scored content</h3>
            <ElementsList elements={scored} />
          </div>
        )}
        <Footer />
      </div>
      {modal && <EditProfile setModal={setModal} user={user} />}
    </>
  );
};

export default Profile;
