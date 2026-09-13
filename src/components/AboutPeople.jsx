import React from 'react';
import './aboutPeople.css';

export default function AboutPeople() {
  return (
    <section className="aboutPeople">
      <p className="aboutPeopleEyebrow">People</p>
      <h2 className="aboutPeopleTitle">
        <span>People behind</span>
        <span>
          <em>your</em> care
        </span>
      </h2>

      <div className="aboutPeopleIntro">
        <p>
          Good care is never the work of just one person. Behind every assessment is a
          multidisciplinary team of professionals and support specialists working together to
          understand the whole picture and guide you every step of the way.
        </p>
        <p>
          All of our clinical psychologists, occupational therapists and speech and language
          therapists are HCPC-registered professionals.
        </p>
      </div>

      <div className="aboutPeopleFeature">
        <div className="aboutPeoplePhoto">
          <img
            src="/images/different-minds.avif"
            alt="Two clinicians talking together. Different minds, same mission."
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="aboutPeopleTeam">
          <h3 className="aboutPeopleTeamTitle">
            <span>
              Our <em>multidisciplinary</em>
            </span>
            <span className="aboutPeopleTeamTitleLine">team</span>
          </h3>
          <p>
            No single perspective tells the whole story. Our clinicians bring together expertise
            from psychology, occupational therapy, speech and language therapy and other relevant
            disciplines, depending on the assessment and the person’s individual needs.
          </p>
          <p>
            By looking at development, communication, behaviour, sensory needs and everyday life
            together, the team can build a fuller picture and reach conclusions that are
            thoughtful, evidence-based and genuinely useful.
          </p>
        </div>
      </div>
    </section>
  );
}
