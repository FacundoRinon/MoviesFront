import React from "react";
import { useParams } from "react-router-dom";

import "./index.scss";

const SeriesPage = () => {
  const { id } = useParams();
  return (
    <div className="seriesPage">
      <h1>Series</h1>
    </div>
  );
};

export default SeriesPage;
