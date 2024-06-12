import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./index.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/users/`,
      data: {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        password2: password2Value,
      },
    });
    if (response.data.token) {
      dispatch(setToken(response.data));
      navigate("/");
    } else {
      toast.error(`${response.data}`, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        theme: "dark",
      });
    }
  }

  window.scrollTo(0, 0);

  return (
    <div className="signUp">
      <div className="signUp__content">
        <div className="signUp__img">
          <img
            src={`${import.meta.env.VITE_IMG_URL}/logo.png`}
            onClick={() => navigate("/")}
            alt=""
          />
        </div>
        {/* <ToastContainer /> */}
        <div className="signUp__container">
          <h1>Create account</h1>
          <form id="form" method="post" action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              placeholder="First and last name"
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="at least 8 characters"
              value={passwordValue}
              onChange={(event) => setPasswordValue(event.target.value)}
            />
            <label htmlFor="password2">Re-enter password</label>
            <input
              id="password2"
              type="password"
              value={password2Value}
              onChange={(event) => setPassword2Value(event.target.value)}
            />
            <button>Create your IMDb account</button>
          </form>
          <p>
            Already have an account? <Link to={"/login"}>Log in</Link>
          </p>
          <p>
            You can enter the app without a user. <Link to={"/"}>Invited</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
