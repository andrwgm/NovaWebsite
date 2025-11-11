import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => (
  <section className="notfound">
    <div className="notfound__wrapper">
      <img
        src="/images/brAInArm.png"
        alt="A robotic arm illustration"
        className="notfound__image"
      />
      <div className="notfound__copy">
        <p className="notfound__oops">Oops!</p>
        <p className="notfound__message">
          Looks like this URL doesn&apos;t exist.
          <br />
          Let&apos;s get you back on track.
        </p>
        <Link to="/" className="notfound__button">
          <i className="pi pi-home" aria-hidden="true"></i>
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
