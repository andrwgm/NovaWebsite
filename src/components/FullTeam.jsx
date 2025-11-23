import React, { useMemo } from 'react';
import './fullTeam.css';

const TEAM = [
  {
    name: 'Andrew Clark',
    role: 'Chief Executive Officer',
    focus: 'Holds the vision for Nova and keeps every pathway financially sustainable, so families always find a clinic that feels boutique yet scales when they need us most.',
    img: '/images/flower-kid.png',
  },
  {
    name: 'Dr. Alice Bennett',
    role: 'Chief Clinical Officer',
    focus: 'Architects Nova’s diagnostic pathways and personally vets every clinician, guaranteeing NICE-aligned outcomes with the bedside manner of a boutique clinic.',
    img: '/images/girl-book.png',
  },
  {
    name: 'Marcus Reed',
    role: 'Chief Technology Officer',
    focus: 'Owns the secure, AI-enabled platform that keeps assessments moving fast and confidential—so families can book, share records and get answers without friction.',
    img: '/images/penguin-kid.jpg',
  },
  {
    name: 'Lucy Shaw',
    role: 'Chief Marketing Officer',
    focus: 'Keeps Nova visible when families start searching for answers, offering clear language, calm reassurance and the signposting they need to reach us quickly.',
    img: '/images/ChatGPT Image.png',
  },
];

export default function FullTeam() {
  const team = useMemo(() => TEAM.map((person, idx) => ({ ...person, idx })), []);

  return (
    <section className="fullteam">
      <header className="fullteam__head">
        <p className="fullteam__eyebrow">THE PEOPLE OF NOVA</p>
        <h2>Meet the specialists guiding every milestone</h2>
        <p>
          Our multidisciplinary team blends medical expertise with practical support. Whether you need a consultant to
          interpret complex results or a coordinator to help you navigate paperwork, you will always know who to turn to.
        </p>
      </header>

      <div className="fullteam__grid">
        {team.map((person) => (
          <article key={person.idx} className="fullteam__card">
            <div className="fullteam__image">
              <img src={person.img} alt={person.name} loading="lazy" />
            </div>
            <div className="fullteam__body">
              <h3>{person.name}</h3>
              <p className="fullteam__role">{person.role}</p>
              <p className="fullteam__focus">{person.focus}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
