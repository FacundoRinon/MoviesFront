import React, { useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./index.scss";

const LoginModal = ({ setLoginModal, toggleLoginModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setLoginModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setLoginModal]);

  return (
    <>
      <div className="loginModal__content" ref={modalRef}>
        <div className="loginModal__img">
          <img src={`${import.meta.env.VITE_IMG_URL}/logo.png`} alt="" />
        </div>
        <div className="loginModal__container">
          <h1>A user is needed</h1>

          <Link to={"/login"}>Go to login</Link>

          <p>
            Don´t have an account? <Link to={"/signUp"}>Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
