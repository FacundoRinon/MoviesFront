import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setToken } from "../../redux/userSlice";

import "./index.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}users/login`,
      data: {
        email: emailValue,
        password: passwordValue,
      },
    });
    if (response.data.token) {
      dispatch(setToken(response.data));
      navigate("/");
    }
  }

  window.scrollTo(0, 0);

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img src="../public/logo.png" alt="" />
        </div>
        <div className="login__container">
          <h1>Welcome Back</h1>
          <form id="form" method="post" action="" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              placeholder="example@gmail.com"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={passwordValue}
              onChange={(event) => setPasswordValue(event.target.value)}
            />
            <button>Create your IMDb account</button>
          </form>
          <p>
            Don´t have an account? <Link to={"/signUp"}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
