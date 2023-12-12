import React from "react";

import ElementCard from "../ElementCard";

import "./index.scss";

const ElementsList = ({ elements }) => {
  return (
    <div className="elementsList">
      {elements &&
        elements.map((element) => (
          <ElementCard key={element.id} element={element} />
        ))}
    </div>
  );
};

export default ElementsList;
