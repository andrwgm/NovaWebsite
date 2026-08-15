import React from 'react';
import './aboutApproach.css';

const CELLS = [
  {
    id: 'clinical',
    title: 'Clinical psychologists',
    subtitle: (
      <>
        Understanding the wider
        <br />
        picture
      </>
    ),
    paragraphs: [
      'Our clinical psychologists explore areas such as development, behaviour, emotional wellbeing and everyday experiences.',
      'They bring together information from different parts of the assessment to help build a detailed clinical understanding of the individual.',
    ],
  },
  {
    id: 'occupational',
    title: 'Occupational therapists',
    subtitle: (
      <>
        Understanding everyday
        <br />
        experience
      </>
    ),
    paragraphs: [
      'Our occupational therapists can help explore areas such as sensory processing, regulation, routines and how someone experiences and manages everyday activities and environments.',
      'Their perspective can provide valuable context around how neurodevelopmental differences are experienced in daily life.',
    ],
  },
  {
    id: 'speech',
    title: 'Speech and language therapists',
    subtitle: 'Understanding communication',
    paragraphs: [
      'Our speech and language therapists can explore how a person understands, uses and experiences communication and social interaction.',
      "Their input can help build a more detailed picture of an individual's communication profile and how this may present across different situations.",
    ],
  },
  {
    id: 'care',
    title: 'Care and support team',
    subtitle: 'Keeping everything connected',
    paragraphs: [
      'Alongside our clinicians, our care team helps manage the practical side of your pathway, from appointments and information to forms, documentation and what happens next.',
      'Their role is to help make the process feel organised, accessible and easy to follow',
    ],
  },
];

export default function AboutApproach() {
  return (
    <section className="aboutApproach">
      <div className="aboutApproachGrid">
        {CELLS.map((cell) => (
          <article
            key={cell.id}
            className={`aboutApproachCell aboutApproachCell--${cell.id}`}
          >
            <h3 className="aboutApproachCellTitle">{cell.title}</h3>
            <p className="aboutApproachCellSubtitle">{cell.subtitle}</p>
            {cell.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </article>
        ))}
      </div>

      <div className="aboutApproachClosing">
        <h2 className="aboutApproachClosingTitle">
          <span>Our</span>
          <em>approach</em>
        </h2>
        <p>
          Every person comes to Nova Clinics with a different history, different experiences and
          different reasons for seeking an assessment. Our role is to provide a clear clinical
          structure without expecting everyone to fit the same mould.
        </p>
      </div>
    </section>
  );
}
