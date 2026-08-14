import React from 'react';
import AboutStory from '../components/AboutStory';
import AboutSetsApart from '../components/AboutSetsApart';
import AboutPeople from '../components/AboutPeople';
import './about.css';

export default function About() {
  return (
    <main className="about">
      <AboutStory />
      <AboutSetsApart />
      <AboutPeople />
    </main>
  );
}
