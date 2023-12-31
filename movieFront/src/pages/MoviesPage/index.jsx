import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faImages,
  faChevronRight,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { getMovieById } from "../../api/movies";
import { getMovieVideos } from "../../api/movies";
import { getMovieImages } from "../../api/movies";
import { getMovieCast } from "../../api/movies";
import Spinner from "../../components/Spinner";
import VideoPlayer from "../../components/VideoPlayer";
import CastCard from "../../components/CastCard";
import Footer from "../../components/Footer";
import ScoreModal from "../../components/ScoreModal";

import "./index.scss";

const MoviesPage = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [writers, setWriters] = useState([]);

  const [userScore, setUserScore] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const initHome = async () => {
      try {
        setMovie([]);
        const response = await getMovieById(id);
        const response2 = await getMovieVideos(id);
        const filterVideos = response2.data.results.filter((video) => {
          return !video.name.includes("removed");
        });
        const newVideos = [...filterVideos].reverse();
        const response3 = await getMovieImages(id);
        const response4 = await getMovieCast(id);
        setMovie(response.data);
        setVideos(newVideos);
        setPhotos(response3.data.backdrops);
        if (response4.data.cast.length > 0) {
          setCast(response4.data.cast.slice(0, 10));
        } else {
          setCast(response4.data.crew.slice(0, 10));
        }
        const newDirector = response4.data.crew.filter(
          (person) => person.job === "Director"
        );
        const newWriters = response4.data.crew.filter(
          (person) => person.job === "Writer"
        );
        setDirector(newDirector);
        setWriters(newWriters.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };
    initHome();
  }, [id]);

  useEffect(() => {
    const foundScore = user.scored.find(
      (score) =>
        score.element_id === parseInt(movie.id) && score.media === "movie"
    );
    if (foundScore) {
      setUserScore(foundScore.score);
    }
  }, [movie]);

  const toggleModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const filteredPhotos = photos.slice(0, 30);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="seriesPage">
        {movie.id ? (
          <>
            <div className="moviesPage__section1">
              <div className="moviesPage__container">
                <div className="moviesPage__presentation">
                  <div className="moviesPage__presentationInfo">
                    <h1>{movie.title}</h1>
                    <div className="moviesPage__presentationInfoRow">
                      <small>Movie</small>
                      <small>{movie.release_date}</small>
                      <small>{movie.runtime} minutes</small>
                    </div>
                  </div>
                  <div className="moviesPage__presentationScore">
                    <div className="moviesPage__score">
                      <small>Score average</small>
                      <p>
                        <FontAwesomeIcon
                          className="moviesPage__headerIcons--yellow"
                          icon={solidStar}
                        />{" "}
                        {movie.vote_average.toFixed(1)}/10
                      </p>
                      {userScore ? (
                        <small>{movie.vote_count + 1} votes</small>
                      ) : (
                        <small>{movie.vote_count} votes</small>
                      )}
                    </div>
                    <div
                      className="moviesPage__score"
                      onClick={() => setModal(true)}
                    >
                      <small>Your rating</small>
                      {userScore ? (
                        <p>
                          <FontAwesomeIcon
                            className="moviesPage__headerIcons--blue"
                            icon={solidStar}
                          />{" "}
                          {userScore}/10
                        </p>
                      ) : (
                        <p>
                          <FontAwesomeIcon
                            className="moviesPage__headerIcons"
                            icon={regularStar}
                          />{" "}
                          Rate
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="moviesPage__visuals">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt=""
                    className="moviesPage__poster"
                  />
                  <div className="moviesPage__video">
                    {videos.length > 1 ? (
                      <VideoPlayer video={videos[0]} />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="moviesPage__visualsCol">
                    <Link
                      to={`/videos/${id}/movies/0`}
                      className="moviesPage__visualBox"
                    >
                      <FontAwesomeIcon
                        className="moviesPage__headerIcons"
                        icon={faVideo}
                      />
                      <p>{videos.length} Videos</p>
                    </Link>
                    <Link
                      to={`/photos/${id}/movies/0`}
                      className="moviesPage__visualBox"
                    >
                      <FontAwesomeIcon
                        className="moviesPage__headerIcons"
                        icon={faImages}
                      />
                      <p>{photos.length} Photos</p>
                    </Link>
                  </div>
                </div>
                <div className="moviesPage__genres">
                  {movie.genres.map((genre) => {
                    return (
                      <p className="moviesPage__genre" key={genre.id}>
                        {genre.name}
                      </p>
                    );
                  })}
                </div>
                <div className="moviesPage__overview">
                  <p>{movie.overview}</p>
                  <div className="moviesPage__director">
                    {director.length > 1 ? (
                      <h3>Directors</h3>
                    ) : (
                      <h3>Director</h3>
                    )}
                    {director.map((dir) => (
                      <div key={dir.id} className="moviesPage__crewCard">
                        <img
                          src={`https://image.tmdb.org/t/p/original${dir.profile_path}`}
                          alt=""
                        />
                        <p>{dir.name}</p>
                      </div>
                    ))}
                    {writers.length > 1 ? <h4>Writers</h4> : <h4>Writer</h4>}
                    {writers.map((wri) => (
                      <div
                        key={wri.id}
                        className="moviesPage__crewCard--writer"
                      >
                        {wri.profile_path === null ? (
                          <img
                            src="https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
                            alt=""
                          />
                        ) : (
                          <img
                            src={`https://image.tmdb.org/t/p/original${wri.profile_path}`}
                            alt=""
                          />
                        )}
                        <p>{wri.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="moviesPage__section2">
              <div className="moviesPage__container">
                <div className="moviesPage__dataSection">
                  <div className="moviesPage__data">
                    <div className="moviesPage__cast">
                      <h2
                        className="moviesPage__clickRow"
                        onClick={() => navigate(`/cast/${id}/movies`)}
                      >
                        Top cast <FontAwesomeIcon icon={faChevronRight} />
                      </h2>
                      <div className="moviesPage__castSection">
                        {cast.map((castMember) => (
                          <CastCard key={castMember.id} person={castMember} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="moviesPage__photosCol">
                    <h2 className="moviesPage__clickRow">
                      Photos <FontAwesomeIcon icon={faChevronRight} />
                    </h2>
                    <div className="moviesPage__photos">
                      {filteredPhotos.map((photo, index) => (
                        <img
                          key={index}
                          src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
                          alt=""
                          className="moviesPage__photo"
                          onClick={() =>
                            navigate(`/photos/${id}/movie/${index}`)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="moviesPage__section1">
              <Footer />
            </div>
          </>
        ) : (
          <div className="moviesPage">
            <div className="moviesPage__spinner">
              <Spinner />
            </div>
          </div>
        )}
      </div>
      {modal && (
        <div className="modalContainer">
          <ScoreModal
            element={movie}
            toggleModal={toggleModal}
            series={false}
            setUserScore={setUserScore}
            setModal={setModal}
          />
        </div>
      )}
    </>
  );
};

export default MoviesPage;
