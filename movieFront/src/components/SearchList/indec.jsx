import React from "react";

import SearchResult from "../SearchResult";

import "./index.scss";

const SearchList = ({ results, setSearchValue }) => {
  const showResults = results.slice(0, 6);
  console.log(showResults);

  return (
    <>
      <div className="searchList">
        {results.length > 0 &&
          showResults.map((result) => (
            <SearchResult
              key={result.id}
              result={result}
              setSearchValue={setSearchValue}
            />
          ))}
      </div>
    </>
  );
};

export default SearchList;
