import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { getUpcomingMovies } from "../../api/movies";
import { getPopularMovies } from "../../api/movies";
import { getTopRated } from "../../api/movies";
import { getTrendingMovies } from "../../api/movies";

import { topRatedSeries } from "../../api/series";
import { getTrending } from "../../api/series";
import { updateUser } from "../../redux/userSlice";

import UpcomingMovies from "../../components/UpcomingMovies";
import ElementsList from "../../components/ElementsList";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import ReducerLoader from "../../components/ReducerLoader";

import "./index.scss";

const Home = () => {
  const user = useSelector((state) => state.user);

  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [apiPage, setApiPage] = useState(1);

  const dispatch = useDispatch();

  // const initHome = async () => {
  //   const response = await getMovies(apiPage);
  //   setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
  // };

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

  const treMovies = async () => {
    const response = await getTrendingMovies();
    setTrendingMovies(response.data.results);
  };

  const seriesTop = async () => {
    const response = await topRatedSeries();
    setTopSeries(response.data.results);
  };

  const treSeries = async () => {
    const response = await getTrending();
    setTrendingSeries(response.data.results);
  };

  useEffect(() => {
    upcoming();
    popular();
    top();
    seriesTop();
    treSeries();
    treMovies();
  }, [apiPage]);

  useEffect(() => {
    async function getScored() {
      const response = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/movie/`,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(updateUser(response.data.newScored));
    }
    getScored();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {upcomingMovies && upcomingMovies.length > 0 ? (
        <div className="home">
          <UpcomingMovies list={upcomingMovies} />
          <div className="home__normalList">
            <h2>What to watch</h2>
            <p>Trending TV shows</p>
            <ElementsList elements={trendingSeries} />
            <p>Trending Movies</p>
            <ElementsList elements={trendingMovies} />
          </div>
          <div className="home__normalList">
            <h2>Top rated</h2>
            <p>Series</p>
            <ElementsList elements={topSeries} topSeries={true} />
            <p>Movies</p>
            <ElementsList elements={topRated} />
          </div>
          <div className="home__normalList">
            <h2>Popular</h2>
            <p>Popular movies in IMDb</p>
            <ElementsList elements={popularMovies} />
          </div>
          <ReducerLoader />
          <Footer />
        </div>
      ) : (
        <div className="home">
          <div className="home__spinner">
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
