import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
