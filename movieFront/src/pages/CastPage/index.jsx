import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getSerieById, getSeriesCast } from "../../api/series";
import { getMovieById, getMovieCast } from "../../api/movies";
import CastCard from "../../components/CastCard";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

import "./index.scss";

const CastPage = () => {
  const { id, media } = useParams();

  const navigate = useNavigate();

  const [back, setBack] = useState("");
  const [visual, setVisual] = useState(null);
  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (media === "tv") {
          const response = await getSerieById(id);
          const response2 = await getSeriesCast(id);
          setVisual(response.data);
          setPersonal(response2.data);
          setBack("series");
        } else {
          const response = await getMovieById(id);
          const response2 = await getMovieCast(id);
          setVisual(response.data);
          setPersonal(response2.data);
          setBack(media);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  console.log(personal.crew);
  console.log(personal.cast);

  return (
    <div className="castPage">
      {visual ? (
        <>
          <div className="castPage__section1">
            <div className="castPage__container">
              <div className="castPage__backRow">
                <p onClick={() => navigate(`/${back}/${id}`)}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Back
                </p>
              </div>
              <div className="castPage__header">
                <img
                  src={`https://image.tmdb.org/t/p/original${visual.poster_path}`}
                  alt=""
                />
                <div className="castPage__headerInfo">
                  <p>{visual.name || visual.title}</p>
                  <h2>Cast list</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="castPage__section2">
            <div className="castPage__container">
              <p className="castPage__specification">Complete Cast</p>

              <div className="castPage__members">
                {personal.cast.map((person) => (
                  <div className="castPage__person">
                    <CastCard key={person.id} person={person} />
                  </div>
                ))}
              </div>
              <p className="castPage__specification">Complete Crew</p>
              <div className="castPage__members">
                {personal.crew.map((person2) => (
                  <div className="castPage__person">
                    <CastCard key={person2.id} person={person2} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="castPage__section1">
            <Footer />
          </div>
        </>
      ) : (
        <div className="castPage__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CastPage;
