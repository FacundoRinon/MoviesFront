import { Routes, Route } from "react-router-dom";

import { ROUTES } from "./data/constants";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SeriesPage from "./pages/SeriesPage";
import MoviesPage from "./pages/MoviesPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.signUp} element={<SignUp />} />
      <Route path={ROUTES.login} element={<Login />} />
      <Route path={ROUTES.home} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.serie} element={<SeriesPage />} />
        <Route path={ROUTES.movie} element={<MoviesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
