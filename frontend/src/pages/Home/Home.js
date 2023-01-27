import React from 'react';
import {MdRowing} from "react-icons/md";
import {Link} from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <MdRowing size={45} />
        </div>
        <ul className="home-links">
         <ShowOnLogout>
           <li>
            <Link to="/register">Register</Link>
           </li>
          </ShowOnLogout>
          <ShowOnLogout>
          <li>
            <button className="--btn --btn=primary">
            <Link to="/login">Login</Link>
            </button>
          </li>
          </ShowOnLogout>
          <ShowOnLogin>
          <li>
            <button className="--btn --btn=primary">
            <Link to="/dashboard">Dashboard</Link>
            </button>
          </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/*Hero Section */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Workout Log Tracker for Rowers</h2>
          <p>Record and Track Your Rowing Workouts</p>
          <div className="hero-buttons">
          <button className="--btn --btn-secondary">
              <Link to="/dashboard"> Learn More</Link>
          </button>
          </div>
          <div className="--flex-start">
            <NumberText num="10K" text="Rowing Athletes" />
            <NumberText num="25K" text="Workouts Created" />
            <NumberText num="100+" text="Rowing Teams" />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="I" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({num, text}) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  )
};

export default Home;
