import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImages,
  faChevronLeft,
  faChevronRight,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { getSerieById } from "../../api/series";
import { getSeriesVideosById } from "../../api/series";
import Spinner from "../../components/Spinner";
import VideoPlayer from "../../components/VideoPlayer";
import EpisodeCard from "../../components/EpisodeCard";
import Footer from "../../components/Footer";

import "./index.scss";

const SeriesPage = () => {
  const { id } = useParams();

  const [series, setSeries] = useState([]);
  const [videos, setVideos] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const initHome = async () => {
      try {
        const response = await getSerieById(id);
        const response2 = await getSeriesVideosById(id);
        const newVideos = response2.data.results.filter((video) => {
          return !video.name.includes("removed");
        });
        setSeries(response.data);
        setVideos(newVideos);
      } catch (error) {
        console.log(error);
      }
    };
    initHome();
  }, []);

  console.log(series);

  return (
    <div className="seriesPage">
      {series.id ? (
        <>
          <div className="seriesPage__section1">
            <div className="seriesPage__container">
              <div className="seriesPage__episodesRow">
                <p>Episode guide {series.number_of_episodes}</p>
              </div>
              <div className="seriesPage__presentation">
                <div className="seriesPage__presentationInfo">
                  <h1>{series.name}</h1>
                  <div className="seriesPage__presentationInfoRow">
                    <small>TV Series</small>
                    <small>{series.first_air_date}</small>
                  </div>
                </div>
                <div className="seriesPage__presentationScore">
                  <div className="seriesPage__score">
                    <small>Score average</small>
                    <p>
                      <FontAwesomeIcon
                        className="seriesPage__headerIcons--yellow"
                        icon={solidStar}
                      />{" "}
                      {series.vote_average}/10
                    </p>
                    <small>{series.vote_count} votes</small>
                  </div>
                  <div className="seriesPage__score">
                    <small>Your rating</small>
                    <p>
                      <FontAwesomeIcon
                        className="seriesPage__headerIcons"
                        icon={regularStar}
                      />{" "}
                      Rate
                    </p>
                  </div>
                </div>
              </div>
              <div className="seriesPage__visuals">
                <img
                  src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                  alt=""
                  className="seriesPage__poster"
                />
                <div className="seriesPage__video">
                  {videos.length > 1 ? (
                    <VideoPlayer videos={videos} />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="seriesPage__visualsCol">
                  <div className="seriesPage__visualBox">
                    <FontAwesomeIcon
                      className="seriesPage__headerIcons"
                      icon={faVideo}
                    />
                    <p>{videos.length} Videos</p>
                  </div>
                  <div className="seriesPage__visualBox">
                    <FontAwesomeIcon
                      className="seriesPage__headerIcons"
                      icon={faImages}
                    />
                    <p>Photos</p>
                  </div>
                </div>
              </div>
              <div className="seriesPage__genres">
                {series.genres.map((genre) => {
                  return (
                    <p className="seriesPage__genre" key={genre.id}>
                      {genre.name}
                    </p>
                  );
                })}
              </div>
              <div className="seriesPage__overview">
                <p>{series.overview}</p>
              </div>
            </div>
          </div>
          <div className="seriesPage__section2">
            <div className="seriesPage__container">
              <div className="seriesPage__episodesSection">
                <div className="seriesPage__episodes">
                  <h2>
                    {series.number_of_episodes} Episodes
                    <FontAwesomeIcon icon={faChevronRight} />
                  </h2>
                  <EpisodeCard episode={series.last_episode_to_air} />
                </div>
                <div className="seriesPage__photosCol">
                  <p>photos</p>
                </div>
              </div>
            </div>
          </div>
          <div className="seriesPage__section1">
            <Footer />
          </div>
        </>
      ) : (
        <div className="seriesPage">
          <div className="seriesPage__spinner">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default SeriesPage;
