import React from "react";

import ElementCard from "../ElementCard";

import "./index.scss";

const ElementsList = ({ elements }) => {
  console.log(elements);
  return (
    <div className="elementsList">
      <ElementCard />
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
      <p>elements</p>
    </div>
  );
};

export default ElementsList;
