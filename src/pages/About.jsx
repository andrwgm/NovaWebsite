import React from 'react';
import AboutStory from '../components/AboutStory';
import AboutSetsApart from '../components/AboutSetsApart';
import './about.css';

export default function About() {
  return (
    <main className="about">
      <AboutStory />
      <AboutSetsApart />
    </main>
  );
}
