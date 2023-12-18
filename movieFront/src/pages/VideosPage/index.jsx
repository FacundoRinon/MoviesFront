import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { getMovieVideos } from "../../api/movies";
import { getSeriesVideosById } from "../../api/series";
import VideoPlayer from "../../components/VideoPlayer";
import Spinner from "../../components/Spinner";

import "./index.scss";

const VideosPage = () => {
  const { id } = useParams();
  const { media } = useParams();
  const { position } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState(position);

  useEffect(() => {
    const initVideos = async () => {
      try {
        if (media === "tv") {
          const response = await getSeriesVideosById(id);
          const newArray = [...response.data.results].reverse();
          setVideos(newArray);
        } else {
          const response = await getMovieVideos(id);
          const newArray = [...response.data.results].reverse();
          setVideos(newArray);
        }
      } catch (error) {
        console.log(error);
      }
    };
    initVideos();
  }, []);

  const increaseSelected = () => {
    if (selected < videos.length - 1) {
      setSelected(parseInt(selected) + 1);
    } else {
      setSelected(0);
    }
  };

  const decreaseSelected = () => {
    if (selected > 0) {
      setSelected(parseInt(selected) - 1);
    } else {
      setSelected(videos.length - 1);
    }
  };

  return (
    <div className="videosPage">
      {videos && videos.length > 0 ? (
        <>
          <div className="videosPage__backRow">
            <FontAwesomeIcon
              className="videosPage__backRow--element"
              icon={faArrowLeft}
              onClick={() => navigate(-1)}
            />
            <p className="videosPage__backRow--element">
              {parseInt(selected) + 1}/{videos.length}
            </p>
          </div>
          <div className="videosPage__selectedPhoto">
            <div className="videosPage__chevronRow">
              <FontAwesomeIcon
                className="videosPage__chevron"
                icon={faChevronLeft}
                onClick={() => decreaseSelected()}
              />
              <FontAwesomeIcon
                className="videosPage__chevron"
                icon={faChevronRight}
                onClick={() => increaseSelected()}
              />
            </div>
            <div className="videosPage__container">
              <VideoPlayer video={videos[selected]} />
            </div>
          </div>
        </>
      ) : (
        <div className="videosPage__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default VideosPage;
