import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImages,
  faChevronRight,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { getSerieById } from "../../api/series";
import { getSeriesVideosById } from "../../api/series";
import { getSeriesImages } from "../../api/series";
import { getSeriesCast } from "../../api/series";
import Spinner from "../../components/Spinner";
import VideoPlayer from "../../components/VideoPlayer";
import EpisodeCard from "../../components/EpisodeCard";
import CastCard from "../../components/CastCard";
import Footer from "../../components/Footer";

import "./index.scss";

const SeriesPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [series, setSeries] = useState([]);
  const [videos, setVideos] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const initHome = async () => {
      try {
        const response = await getSerieById(id);
        const response2 = await getSeriesVideosById(id);
        const filterVideos = response2.data.results.filter((video) => {
          return !video.name.includes("removed");
        });
        const newVideos = [...filterVideos].reverse();
        const response3 = await getSeriesImages(id);
        const response4 = await getSeriesCast(id);
        setSeries(response.data);
        setVideos(newVideos);
        setPhotos(response3.data.backdrops);
        if (response4.data.cast.length > 0) {
          setCast(response4.data.cast.slice(0, 10));
        } else {
          setCast(response4.data.crew.slice(0, 10));
        }
      } catch (error) {
        console.log(error);
      }
    };
    initHome();
  }, []);

  const filteredPhotos = photos.slice(0, 30);

  return (
    <div className="seriesPage">
      {series.id ? (
        <>
          <div className="seriesPage__section1">
            <div className="seriesPage__container">
              <div className="seriesPage__episodesRow">
                <p className="seriesPage__clickRow">
                  Episode guide {series.number_of_episodes}{" "}
                  <FontAwesomeIcon icon={faChevronRight} />
                </p>
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
                      {series.vote_average.toFixed(1)}/10
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
                    <VideoPlayer video={videos[0]} />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="seriesPage__visualsCol">
                  <Link
                    to={`/videos/${id}/tv/0`}
                    className="seriesPage__visualBox"
                  >
                    <FontAwesomeIcon
                      className="seriesPage__headerIcons"
                      icon={faVideo}
                    />
                    <p>{videos.length} Videos</p>
                  </Link>
                  <Link
                    to={`/photos/${id}/tv/0`}
                    className="seriesPage__visualBox"
                  >
                    <FontAwesomeIcon
                      className="seriesPage__headerIcons"
                      icon={faImages}
                    />
                    <p>{photos.length} Photos</p>
                  </Link>
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
              <div className="seriesPage__dataSection">
                <div className="seriesPage__data">
                  <div className="seriesPage__episodes">
                    <h2 className="seriesPage__clickRow">
                      {series.number_of_episodes} Episodes{" "}
                      <FontAwesomeIcon icon={faChevronRight} />
                    </h2>
                    <p>Most recent</p>
                    {series.last_last_episode_to_air ? (
                      <EpisodeCard episode={series.last_episode_to_air} />
                    ) : (
                      <p>Coming soon</p>
                    )}
                  </div>
                  <div className="seriesPage__cast">
                    <h2 className="seriesPage__clickRow">
                      Top cast <FontAwesomeIcon icon={faChevronRight} />
                    </h2>
                    <div className="seriesPage__castSection">
                      {cast.map((castMember) => (
                        <CastCard key={castMember.id} person={castMember} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="seriesPage__photosCol">
                  <h2 className="seriesPage__clickRow">
                    Photos <FontAwesomeIcon icon={faChevronRight} />
                  </h2>
                  <div className="seriesPage__photos">
                    {filteredPhotos.map((photo, index) => (
                      <img
                        key={index}
                        src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
                        alt=""
                        className="seriesPage__photo"
                        onClick={() => navigate(`/photos/${id}/tv/${index}`)}
                      />
                    ))}
                  </div>
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