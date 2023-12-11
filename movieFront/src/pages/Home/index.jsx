import React, { useEffect, useState } from "react";

import { getMovies } from "../../api/movies";
import { getUpcomingMovies } from "../../api/movies";
import { getPopularMovies } from "../../api/movies";

import UpcomingMovies from "../../components/UpcomingMovies";

import "./index.scss";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [apiPage, setApiPage] = useState(1);

  const initHome = async () => {
    const response = await getMovies(apiPage);
    setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
  };

  const upcoming = async () => {
    const response = await getUpcomingMovies();
    setUpcomingMovies(response.data.results);
  };

  const popular = async () => {
    const response = await getPopularMovies();
    setPopularMovies(response.data.results);
  };

  useEffect(() => {
    initHome();
    upcoming();
    popular();
  }, [apiPage]);

  console.log(upcomingMovies);

  return (
    <div className="home">
      {upcomingMovies && upcomingMovies.length > 0 ? (
        <UpcomingMovies list={upcomingMovies} />
      ) : (
        <p>Loading</p>
      )}
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
