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
            alt="Two clinicians talking together"
            loading="lazy"
            decoding="async"
          />
          <div className="aboutPeopleClaim">
            <p className="aboutPeopleClaimLead">Different minds</p>
            <p className="aboutPeopleClaimSub">Same mission</p>
          </div>
        </div>

        <div className="aboutPeopleTeam">
          <h3 className="aboutPeopleTeamTitle">
            <span>
              Our <em>multidisciplinary</em>
            </span>
            <span className="aboutPeopleTeamTitleLine">team</span>
          </h3>
          <p>
            Good care is never the work of just one person. Behind every assessment is a
            multidisciplinary team of professionals and support specialists working together to
            understand the whole picture and guide you every step of the way.
          </p>
          <p className="aboutPeopleTeamBold">
            All of our clinical psychologists, occupational therapists and speech and language
            therapists are HCPC-registered professionals.
          </p>
        </div>
      </div>
    </section>
  );
}
