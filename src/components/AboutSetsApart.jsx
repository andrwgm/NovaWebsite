import React from 'react';
import './aboutSetsApart.css';

export default function AboutSetsApart() {
  return (
    <section className="aboutSetsApart">
      <h2 className="aboutSetsTitle">
        What <em>sets</em> us apart?
      </h2>

      <div className="aboutSetsIntro">
        <p>
          Autism and ADHD do not look the same for everyone. That is why our approach brings
          together different clinical perspectives rather than looking at one part of a person in
          isolation.
        </p>
        <p>
          Our multidisciplinary clinical team includes clinical psychologists, occupational
          therapists and speech and language therapists, all registered with the Health and Care
          Professions Council (HCPC).
        </p>
        <p>
          Each discipline brings a different perspective — from development, behaviour and emotional
          wellbeing to communication, sensory processing and everyday functioning — helping us
          build a more complete understanding of the person in front of us.
        </p>
      </div>

      <div className="aboutSetsGrid">
        <div className="aboutSetsLead">
          <p className="aboutSetsLeadNavy">
            Different
            <br />
            perspectives.
          </p>
          <p className="aboutSetsLeadCoral">
            One joined-up
            <br />
            picture.
          </p>
        </div>

        <article className="aboutSetsCard aboutSetsCard--expertise">
          <h3 className="aboutSetsCardTitle">
            Joined-up
            <br />
            <em>expertise</em>
          </h3>
          <p>
            Different professionals can contribute different pieces of the picture, while working
            within one coordinated assessment pathway.
          </p>
        </article>

        <article className="aboutSetsCard aboutSetsCard--communication">
          <h3 className="aboutSetsCardTitle">
            Clear
            <br />
            <em>communication</em>
          </h3>
          <p>
            We want you to understand what is happening, why it is happening and what comes next,
            without having to piece the process together yourself.
          </p>
        </article>

        <article className="aboutSetsCard aboutSetsCard--neurodiversity">
          <h3 className="aboutSetsCardTitle">
            Neurodiversity-
            <br />
            <em>affirming care</em>
          </h3>
          <p>
            We recognise that Autism and ADHD can be experienced in many different ways. Our
            approach is centred around understanding the individual, their experiences, needs and
            strengths.
          </p>
        </article>

        <article className="aboutSetsCard aboutSetsCard--beyond">
          <h3 className="aboutSetsCardTitle">
            Care beyond the
            <br />
            <em>appointment</em>
          </h3>
          <p>
            A good assessment experience is not only about the time you spend with a clinician. It
            is also about everything around it, preparation, communication, documentation,
            coordination and clear next steps.
          </p>
        </article>
      </div>
    </section>
  );
}
