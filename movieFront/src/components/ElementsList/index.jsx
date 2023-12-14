import React from "react";

import ElementCard from "../ElementCard";

import "./index.scss";

const ElementsList = ({ elements, topSeries }) => {
  return (
    <div className="elementsList">
      {elements &&
        elements.map((element) => (
          <ElementCard key={element.id} element={element} series={topSeries} />
        ))}
    </div>
  );
};

export default ElementsList;
