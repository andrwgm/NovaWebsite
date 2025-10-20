import React, { useMemo } from 'react';
import './peopleBehind.css';

const TEAM = [
  {
    name: 'Dr. Sofia Patel',
    role: (
      <>
        Consultant Psychiatrist
        <br />
        Neurodevelopment specialist
      </>
    ),
    bio: 'Guides every diagnostic assessment with an evidence-based approach while making families feel heard from day one.',
    img: '/images/ChatGPT Image.png',
  },
  {
    name: 'Jordan Ellis',
    role: (
      <>
        Care Coordinator
        <br />
        Family liaison
      </>
    ),
    bio: 'Your go-to contact for bookings, paperwork and keeping you updated at each milestone of the journey.',
    img: '/images/penguin-kid.jpg',
  },
  {
    name: 'Amelia Brooks',
    role: (
      <>
        Clinical Psychologist
        <br />
        Report writer
      </>
    ),
    bio: 'Transforms test results into clear, practical reports packed with personalised next steps and resources.',
    img: '/images/flower-kid.png',
  },{
    name: 'Dr. Sofia Patel',
    role: (
      <>
        Consultant Psychiatrist
        <br />
        Neurodevelopment specialist
      </>
    ),
    bio: 'Guides every diagnostic assessment with an evidence-based approach while making families feel heard from day one.',
    img: '/images/ChatGPT Image.png',
  },
  {
    name: 'Jordan Ellis',
    role: (
      <>
        Care Coordinator
        <br />
        Family liaison
      </>
    ),
    bio: 'Your go-to contact for bookings, paperwork and keeping you updated at each milestone of the journey.',
    img: '/images/penguin-kid.jpg',
  },
  {
    name: 'Amelia Brooks',
    role: (
      <>
        Clinical Psychologist
        <br />
        Report writer
      </>
    ),
    bio: 'Transforms test results into clear, practical reports packed with personalised next steps and resources.',
    img: '/images/flower-kid.png',
  },
];

export default function PeopleBehind() {
  const team = useMemo(() => TEAM.map((member, idx) => ({ ...member, idx })), []);

  return (
    <section className="team">
      <header className="team-head">
        <h2 className="team-title">PEOPLE BEHIND YOUR CARE</h2>
        <p className="team-subtitle">
          From consultant psychiatrists to friendly care-coordinators, every member of our team plays
          a vital role in delivering a fast, seamless experience. You’ll meet GMC-registered clinicians
          who follow NICE guidelines and the support specialists who schedule your appointments,
          prepare reports and guide you through funding options—working together with zero waiting-list
          frustration.
        </p>
      </header>

      <div className="team-grid">
        {team.map((person) => (
          <article key={person.idx} className="team-card" tabIndex={0}>
            <div className="team-card-figure">
              <img src={person.img} alt={person.name} />
              <div className="team-card-info">
                <div className="team-card-summary">
                  <h3 className="team-card-name">{person.name}</h3>
                  <p className="team-card-role">{person.role}</p>
                </div>
                <p className="team-card-bio">{person.bio}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
