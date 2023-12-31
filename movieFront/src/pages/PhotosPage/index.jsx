import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { getSeriesImages } from "../../api/series";
import { getMovieImages } from "../../api/movies";
import Spinner from "../../components/Spinner";

import "./index.scss";

const PhotosPage = () => {
  const { id } = useParams();
  const { media } = useParams();
  const { position } = useParams();
  const navigate = useNavigate();

  const [back, setBack] = useState("");
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState(position);

  useEffect(() => {
    const initPhotos = async () => {
      try {
        if (media === "tv") {
          const response = await getSeriesImages(id);
          setPhotos(response.data.backdrops);
          setBack("series");
        } else {
          const response = await getMovieImages(id);
          setPhotos(response.data.backdrops);
          setBack(media);
        }
      } catch (error) {
        console.log(error);
      }
    };
    initPhotos();
  }, []);

  const increaseSelected = () => {
    if (selected < photos.length - 1) {
      setSelected(parseInt(selected) + 1);
    } else {
      setSelected(0);
    }
  };

  const decreaseSelected = () => {
    if (selected > 0) {
      setSelected(parseInt(selected) - 1);
    } else {
      setSelected(photos.length - 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="photosPage">
      {photos && photos.length > 0 ? (
        <>
          <div className="photosPage__backRow">
            <FontAwesomeIcon
              className="photosPage__backRow--element"
              icon={faArrowLeft}
              onClick={() => navigate(`/${back}/${id}`)}
            />
            <p className="photosPage__backRow--element">
              {parseInt(selected) + 1}/{photos.length}
            </p>
          </div>
          <div className="photosPage__selectedPhoto">
            <div className="photosPage__chevronRow">
              <FontAwesomeIcon
                className="photosPage__chevron"
                icon={faChevronLeft}
                onClick={() => decreaseSelected()}
              />
              <FontAwesomeIcon
                className="photosPage__chevron"
                icon={faChevronRight}
                onClick={() => increaseSelected()}
              />
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${photos[selected].file_path}`}
              alt=""
            />
          </div>
          <div className="photosPage__photosRow">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
                alt=""
                onClick={() => {
                  setSelected(index);
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="photosPage__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PhotosPage;
