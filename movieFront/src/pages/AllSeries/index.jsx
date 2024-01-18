import React, { useEffect, useState } from "react";

import { getSeries } from "../../api/series";
import Element from "../../components/Element";
import Spinner from "../../components/Spinner";

import "./index.scss";

const AllSeries = () => {
  const [series, setSeries] = useState([]);
  const [apiPage, setApiPage] = useState(1);

  const initHome = async () => {
    const response = await getSeries(apiPage);
    if (apiPage === 1) {
      setSeries(response.data.results);
    } else {
      setSeries((prevSeries) => [...prevSeries, ...response.data.results]);
    }
  };

  useEffect(() => {
    initHome();
  }, [apiPage]);

  return (
    <div className="allSeries">
      {series.length > 0 ? (
        <div className="allSeries__container">
          <h1>All series</h1>
          <div className="allSeries__movieList">
            {series &&
              series.map((serie) => (
                <Element key={serie.id} element={serie} type={"series"} />
              ))}
          </div>
          <div className="allSeries__load">
            <button onClick={() => setApiPage(apiPage + 1)}>Load more</button>
          </div>
        </div>
      ) : (
        <div className="allSeries__spinner">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AllSeries;
