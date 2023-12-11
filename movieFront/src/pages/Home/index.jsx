import React, { useEffect, useState } from "react";

import { getMovies } from "../../api/movies";
import { getUpcomingMovies } from "../../api/movies";
import { getPopularMovies } from "../../api/movies";
import { getTopRated } from "../../api/movies";
import { getTrending } from "../../api/series";

import UpcomingMovies from "../../components/UpcomingMovies";
import ElementsList from "../../components/ElementsList";

import "./index.scss";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
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

  const top = async () => {
    const response = await getTopRated();
    setTopRated(response.data.results);
  };

  const treSeries = async () => {
    const response = await getTrending();
    setTrendingSeries(response.data.results);
  };

  useEffect(() => {
    initHome();
    upcoming();
    popular();
    top();
    treSeries();
  }, [apiPage]);

  console.log(popularMovies);

  return (
    <div className="home">
      {upcomingMovies && upcomingMovies.length > 0 ? (
        <UpcomingMovies list={upcomingMovies} />
      ) : (
        <p>Loading</p>
      )}
      <div className="home__normalList">
        <h2>What to watch</h2>
        <small>Trending TV shows</small>
        <ElementsList elements={trendingSeries} />
      </div>
      <div className="home__normalList">
        <h2>Popular</h2>
        <small>Trending TV shows</small>
        <ElementsList elements={popularMovies} />
      </div>
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
