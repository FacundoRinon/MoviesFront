import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { getSerieById, getSeriesCast } from "../../api/series";
import CastCard from "../../components/CastCard";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";

import "./index.scss";

const CastPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [series, setSeries] = useState(null);
  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSerieById(id);
        const response2 = await getSeriesCast(id);
        setSeries(response.data);
        setPersonal(response2.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="castPage">
      {series ? (
        <>
          <div className="castPage__section1">
            <div className="castPage__container">
              <div className="castPage__backRow">
                <p onClick={() => navigate(`/series/${id}`)}>
                  <FontAwesomeIcon icon={faArrowLeft} /> Back
                </p>
              </div>
              <div className="castPage__header">
                <img
                  src={`https://image.tmdb.org/t/p/original${series.poster_path}`}
                  alt=""
                />
                <div className="castPage__headerInfo">
                  <p>{series.name}</p>
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
                {personal.crew.map((person) => (
                  <div className="castPage__person">
                    <CastCard key={person.id} person={person} />
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
