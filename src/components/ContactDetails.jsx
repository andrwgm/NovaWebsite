import React from 'react';
import { Link } from 'react-router-dom';
import {
  CONTACT_EMAIL,
  CONTACT_HOURS,
  CRISIS_NOTE_INTRO,
  CRISIS_NOTE_ITEMS,
  TERMS_PATH,
} from '../data/contactDetails';
import './contactDetails.css';

/**
 * Email, opening hours, Terms link and the crisis note. Used in the footer and in the
 * /contact aside (variant "footer" | "aside" only changes the colours).
 */
export default function ContactDetails({ variant = 'footer', headingId }) {
  return (
    <section
      className={`contact-details contact-details--${variant}`}
      aria-labelledby={headingId}
    >
      <h2 className="contact-details__title" id={headingId}>
        Contact us
      </h2>

      <dl className="contact-details__list">
        <div className="contact-details__row">
          <dt>Email:</dt>
          <dd>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </dd>
        </div>
        <div className="contact-details__row">
          <dt>Opening hours:</dt>
          <dd>{CONTACT_HOURS}</dd>
        </div>
      </dl>

      <p className="contact-details__terms">
        Read our <Link to={TERMS_PATH}>Terms and Conditions</Link>.
      </p>

      <div className="contact-details__crisis">
        <p className="contact-details__crisis-intro">{CRISIS_NOTE_INTRO}</p>
        <ul className="contact-details__crisis-list">
          {CRISIS_NOTE_ITEMS.map((parts, itemIndex) => (
            <li key={itemIndex}>
              {parts.map((part, index) => {
                if (typeof part === 'string') {
                  return <React.Fragment key={index}>{part}</React.Fragment>;
                }
                const href = part.sms ? `sms:${part.sms}` : `tel:${part.tel}`;
                return (
                  <a key={index} href={href}>
                    {part.text}
                  </a>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
