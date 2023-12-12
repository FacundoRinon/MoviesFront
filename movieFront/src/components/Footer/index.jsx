import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__icons">
        <Link
          target="_blank"
          to="https://www.linkedin.com/in/facundo-ri%C3%B1%C3%B3n-93b730220/"
          className="link"
        >
          <FontAwesomeIcon className="footer__icon" icon={faLinkedin} />
        </Link>
        <Link
          target="_blank"
          to="https://github.com/FacundoRinon"
          className="link"
        >
          <FontAwesomeIcon className="footer__icon" icon={faGithub} />
        </Link>
        <Link
          target="_blank"
          to="https://front-twitter3.vercel.app/"
          className="link"
        >
          <FontAwesomeIcon className="footer__icon" icon={faTwitter} />
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <FontAwesomeIcon className="footer__icon" icon={faAddressBook} />
        </Link>
        <Link
          target="_blank"
          to="https://www.youtube.com/imdb"
          className="link"
        >
          <FontAwesomeIcon className="footer__icon" icon={faYoutube} />
        </Link>
      </div>
      <div className="footer__links">
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Get the IMDb App</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Help</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Site Index</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>IMDbPro</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Box Office Mojo</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>IMDb Developer</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Press Room</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Advertising</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Jobs</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Conditions of Use</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Privacy Policy</p>
        </Link>
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          <p>Your Ads Privacy Choices</p>
        </Link>
      </div>
      <div className="footer__logo">
        <img src="../public/logo.png" alt="" />
      </div>
      <small>
        © 1995-2023 by{" "}
        <Link
          target="_blank"
          to="https://web-portfolio-facundorinon.vercel.app/"
          className="link"
        >
          https://web-portfolio-facundorinon.vercel.app/
        </Link>
        , Inc.
      </small>
    </div>
  );
};

export default Footer;
