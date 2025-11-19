import React from 'react';
import { Link } from 'react-router-dom';
import './underConstruction.css';

const UnderConstruction = () => (
  <section className="underconstruction">
    <div className="underconstruction__wrapper">
      <img
        src="/images/brAInArm.png"
        alt="A robotic arm illustration"
        className="underconstruction__image"
      />
      <div className="underconstruction__copy">
        <p className="underconstruction__title">Under construction</p>
        <p className="underconstruction__message">
          We&apos;re working hard on this new section.
          <br />
          Check back soon or return to the homepage.
        </p>
        <Link to="/" className="underconstruction__button">
          <i className="pi pi-home" aria-hidden="true"></i>
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  </section>
);

export default UnderConstruction;
