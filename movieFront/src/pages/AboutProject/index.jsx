import React from "react";

import Footer from "../../components/Footer";

import "./index.scss";

const AboutProject = () => {
  return (
    <div className="aboutProject">
      <div className="aboutProject__container">
        <div className="aboutProject__header">
          <h1>About this project</h1>
          <p className="aboutProject__paragraph">
            This project aims to emulate the IMDb (International Movie Database)
            page, which manages information about a vast number of movies and
            series. On this site, users can obtain details, rate, or add movies
            to various lists created by the user.
          </p>
          <p className="aboutProject__paragraph">
            With that said, my goal was to replicate the functionalities of this
            site, using the information available to me through the TMDB API
            (The Movie Database). The project was undertaken as a way to further
            refine my skills in technologies such as React.js, Node.js,
            Express.js, JavaScript, Scss, while also being my first
            independently completed using a database implemented in MySQL.
          </p>
        </div>
        <div className="aboutProject__tech">
          <h2>Technologies</h2>
          <p className="aboutProject__paragraph">
            To develop the application, I utilized an API created by other
            developers, TMDB, which contains a wealth of information about
            movies and series. It is well-documented, explaining various methods
            to make use of its information.
          </p>
          <p className="aboutProject__paragraph">
            Subsequently, I had to develop the back-end of the application, as
            in addition to the movie information, I needed a database to store
            data about new users and how they interacted with these movies. For
            the development of the back-end, I used Node.js and MySQL for
            creating the database. This is my first personal project using
            MySQL, presenting a challenge as I faced new problems.
          </p>
          <p className="aboutProject__paragraph">
            Finally, for the front-end development, I used React.js and
            Redux.js, technologies in which I already feel very comfortable.
          </p>
          <div className="aboutProject__techLogos">
            <div className="aboutProject__logo">
              <img
                src={`${import.meta.env.VITE_IMG_URL2}/JS.png`}
                alt=""
                className="aboutProject__logoPic"
              />
              <p>JavaScript</p>
            </div>
            <div className="aboutProject__logo">
              <img
                src={`${import.meta.env.VITE_IMG_URL2}/scss.png`}
                alt=""
                className="aboutProject__logoPic"
              />
              <p>Scss</p>
            </div>
            <div className="aboutProject__logo">
              <img
                src={`${import.meta.env.VITE_IMG_URL2}/node.png`}
                alt=""
                className="aboutProject__logoPic"
              />
              <p>Node.js</p>
            </div>
            <div className="aboutProject__logo">
              <img
                src={`${import.meta.env.VITE_IMG_URL2}/react.png`}
                alt=""
                className="aboutProject__logoPic"
              />
              <p>React.js</p>
            </div>
            <div className="aboutProject__logo">
              <img
                src={`${import.meta.env.VITE_IMG_URL2}/redux.png`}
                alt=""
                className="aboutProject__logoPic"
              />
              <p>Redux.js</p>
            </div>
            <div className="aboutProject__logo">
              <img
                src={`${import.meta.env.VITE_IMG_URL2}/Git.png`}
                alt=""
                className="aboutProject__logoPic"
              />
              <p>Github</p>
            </div>
            <div className="aboutProject__logo">
              <img
                src={`${import.meta.env.VITE_IMG_URL2}/mySQL.png`}
                alt=""
                className="aboutProject__logoPic"
              />
              <p>MySQL</p>
            </div>
          </div>
        </div>
        <div className="aboutProject__me">
          <h2>About me</h2>
          <p className="aboutProject__paragraph">
            My name is Facundo Riñón. I am 28 years old and a graduate of the
            coding bootcamp at Hack Academy, where I invested more than 600
            hours to become a full-stack developer. In this course, I learned
            technologies such as React.js, Redux.js, Node.js, MongoDB, MySQL,
            Express, JavaScript, CSS, and GitHub.
          </p>
          <p className="aboutProject__paragraph">
            I recently completed a React-focused course within the NeoCoast
            company, where I continued to deepen my knowledge of this technology
            while learning best practices used in professional environments.
            Additionally, in this course, I had my first introduction to Scss.
          </p>
          <p className="aboutProject__paragraph">
            I entered the IT world after enrolling in the 'Jóvenes a Programar'
            (Jap) course in 2022, from which I graduated the same year.
          </p>
          <div className="aboutProject__myInfo">
            <div className="aboutProject__picSpace">
              <img
                src={`${import.meta.env.VITE_IMG_URL}/yo.jpeg`}
                alt=""
                className="aboutProject__pic"
              />
            </div>
            <div className="aboutProject__contact">
              <p className="contact__linkedIn">LinkedIn</p>
              <p className="contact__github">Github</p>
              <p className="contact__portfolio">Portfolio</p>
            </div>
          </div>
        </div>
        <div className="aboutProject__schedle">
          <h2>Duration</h2>
          <p className="aboutProject__paragraph">
            To carry out the project, I maintained a regular work schedule,
            starting coding at 9 in the morning and finishing around 5 pm from
            Monday to Friday. I followed this routine for a month to reach the
            final product. In the middle of the process, I took a few days off,
            which slowed down the progress a bit more than it should have.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutProject;
