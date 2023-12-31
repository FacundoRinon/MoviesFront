import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getSerieById } from "../../api/series";
import { getSeason } from "../../api/series";
import EpisodeCard from "../../components/EpisodeCard";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

import "./index.scss";

const EpisodesPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [series, setSeries] = useState(null);
  const [season, setSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSerieById(id);
        setSeries(response.data);
        const response2 = await getSeason(id, season);
        setEpisodes(response2.data.episodes);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await getSeason(id, season);
        setEpisodes(response.data.episodes);
      } catch (error) {
        console.log(error);
      }
    };
    getEpisodes();
  }, [season]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="episodesPage">
      {series ? (
        <>
          <div className="episodesPage__section1">
            <div className="episodesPage__container">
              <div className="episodesPage__backRow">
                <p onClick={() => navigate(`/series/${id}`)}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Back
                </p>
              </div>
              <div className="episodesPage__header">
                <img
                  src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                  alt=""
                />
                <div className="episodesPage__headerInfo">
                  <p>{series.name}</p>
                  <h2>Episode list</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="episodesPage__section2">
            <div className="episodesPage__container">
              <p>Seasons</p>
              <div className="episodesPage__seasonsNumbers">
                {series.seasons.map((season) => (
                  <p
                    key={season.id}
                    onClick={() => setSeason(season.season_number)}
                  >
                    {season.name}
                  </p>
                ))}
              </div>
              <div className="episodesPage__episodes">
                {episodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    backdrop={series.backdrop_path}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="episodesPage__section1">
            <Footer />
          </div>
        </>
      ) : (
        <div className="episodesPage__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default EpisodesPage;
