import React from "react";
import ClipLoader from "react-spinners/PuffLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="rgb(245, 209, 6)"
        loading={true}
        cssOverride={override}
        size={200}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
