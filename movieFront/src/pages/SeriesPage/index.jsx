import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImages,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { getSerieById } from "../../api/series";
import { getSeriesVideosById } from "../../api/series";
import Spinner from "../../components/Spinner";

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
        console.log(response.data);
        console.log(response2.data.results);
        setSeries(response.data);
        setVideos(response2.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    initHome();
  }, []);

  return (
    <div className="seriesPage">
      {series.id ? (
        <div className="seriesPage__container">
          <div className="seriesPage__episodesRow">
            <p>Episode guide (length)</p>
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
                  <FontAwesomeIcon className="" icon={solidStar} />{" "}
                  {series.vote_average}/10
                </p>
                <small>{series.vote_count} votes</small>
              </div>
              <div className="seriesPage__score">
                <small>Your rating</small>
                <p>
                  <FontAwesomeIcon className="" icon={regularStar} /> Rate
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
            <img
              src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
              alt=""
              className="seriesPage__video"
            />
            <div className="seriesPage__visualsCol">
              <div className="seriesPage__visualBox">
                <FontAwesomeIcon className="" icon={faVideo} />
                <p>Videos</p>
              </div>
              <div className="seriesPage__visualBox">
                <FontAwesomeIcon icon={faImages} />
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
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default SeriesPage;
