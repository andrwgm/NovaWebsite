import React, { useEffect, useMemo, useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import { UNDER8_INTEREST_ENDPOINT } from '../../utils/api';
import { TURNSTILE_CONTACT_ACTION, TURNSTILE_SITE_KEY, whenTurnstileReady } from '../../utils/turnstile';
import { UNDER8_INTEREST_ANCHOR, UNDER8_MESSAGE } from '../../data/assessmentPricing';
import './contactForm.css';
import './under8InterestForm.css';

export const UNDER8_CONSENT_TEXT =
  'I agree to Nova Clinics emailing me only about assessments for younger children. I can unsubscribe at any time.';

const SERVICE_OPTIONS = [
  { id: 'adhd', label: 'ADHD' },
  { id: 'autism', label: 'Autism' },
  { id: 'both', label: 'Both' },
  { id: 'not_sure', label: 'Not sure' },
];

// Maps the service chosen on the enquiry form (CONTACT_SERVICES ids) to the interest list ids.
const SERVICE_FROM_ENQUIRY = { adhd: 'adhd', autism: 'autism', combined: 'both', unsure: 'not_sure' };

function messageForStatus(status) {
  if (status === 422) return 'Please check your email address and try again.';
  if (status === 429) return 'Please wait a moment and try again.';
  if (status === 403) return 'Please complete the verification and try again.';
  return 'We could not add you to the interest list. Please try again.';
}

/**
 * Interest list for parents of children under 8. It only collects an email address, an optional
 * year of birth (never the child's name), the service of interest and consent to be emailed about
 * assessments for younger children. Posts to the public under8-interest endpoint with the same
 * Turnstile check as the contact form.
 */
export default function Under8InterestForm({ defaultService = '' }) {
  const [email, setEmail] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [service, setService] = useState(SERVICE_FROM_ENQUIRY[defaultService] || 'not_sure');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [done, setDone] = useState(false);
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);

  // A child under 8 was born in the last eight calendar years.
  const years = useMemo(() => {
    const thisYear = new Date().getFullYear();
    return Array.from({ length: 9 }, (_, index) => thisYear - index);
  }, []);

  useEffect(() => {
    if (done) return undefined;
    setTurnstileToken('');
    let cancelled = false;

    const cancelReadyWait = whenTurnstileReady(() => {
      if (cancelled || !turnstileContainerRef.current || !window.turnstile?.render) {
        return;
      }
      if (turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
      turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: TURNSTILE_CONTACT_ACTION,
        theme: 'light',
        size: 'flexible',
        language: 'en',
        'refresh-expired': 'auto',
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
        'timeout-callback': () => setTurnstileToken(''),
      });
    });

    return () => {
      cancelled = true;
      cancelReadyWait();
      if (turnstileWidgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }
      turnstileWidgetIdRef.current = null;
      setTurnstileToken('');
    };
  }, [done]);

  const resetTurnstile = () => {
    setTurnstileToken('');
    if (turnstileWidgetIdRef.current && window.turnstile?.reset) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
    }
  };

  const clearError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const address = email.trim();
    const nextErrors = {};
    if (!address || !address.includes('@')) nextErrors.email = 'Please enter a valid email address.';
    if (!consent) nextErrors.consent = 'Please tick the box to join the interest list.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!turnstileToken) {
      setSubmitError('Please complete the verification before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(UNDER8_INTEREST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: address,
          child_year_of_birth: yearOfBirth ? Number(yearOfBirth) : null,
          service,
          consent: true,
          'cf-turnstile-response': turnstileToken,
        }),
      });

      if (!response.ok) {
        setSubmitError(messageForStatus(response.status));
        resetTurnstile();
        return;
      }

      setEmail('');
      setYearOfBirth('');
      setConsent(false);
      setErrors({});
      setDone(true);
    } catch (error) {
      console.error('Failed to join the under-8 interest list', error);
      setSubmitError('We could not add you to the interest list. Please try again.');
      resetTurnstile();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="u8form"
      id={UNDER8_INTEREST_ANCHOR}
      aria-labelledby="u8form-title"
      tabIndex={-1}
    >
      <h2 className="u8form__title" id="u8form-title">
        Children <span className="u8form__title-italic">under 8</span>
      </h2>
      <p className="u8form__intro">{UNDER8_MESSAGE}</p>

      {done ? (
        <p className="u8form__done" role="status">
          <i className="pi pi-check-circle" aria-hidden="true" />
          <span>
            Thank you, you are on the interest list. We will only email you about assessments for
            younger children.
          </span>
        </p>
      ) : (
        <form className="cform u8form__form" onSubmit={handleSubmit} aria-label="Under 8 interest list">
          <div className="cform__fields">
            <span className="p-float-label">
              <InputText
                id="u8-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError('email');
                }}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'u8-email-error' : undefined}
              />
              <label htmlFor="u8-email">Email address</label>
            </span>
            {errors.email && (
              <p className="cform__error" id="u8-email-error" role="alert">
                <i className="pi pi-exclamation-circle" aria-hidden="true" />
                <span>{errors.email}</span>
              </p>
            )}

            <div className="u8form__year">
              <label className="u8form__label" htmlFor="u8-year">
                Your child&rsquo;s year of birth (optional)
              </label>
              <select
                id="u8-year"
                className="u8form__select"
                value={yearOfBirth}
                onChange={(event) => setYearOfBirth(event.target.value)}
              >
                <option value="">Prefer not to say</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <p className="cform__hint">Please do not tell us your child&rsquo;s name.</p>
            </div>

            <fieldset className="u8form__services">
              <legend className="cform__question">Which assessment are you interested in?</legend>
              <div className="u8form__options">
                {SERVICE_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`u8form__option${service === option.id ? ' is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="u8-service"
                      className="cform__card-input"
                      value={option.id}
                      checked={service === option.id}
                      onChange={() => setService(option.id)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={`cform__check${errors.consent ? ' is-invalid' : ''}`}>
              <Checkbox
                inputId="u8-consent"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.checked);
                  clearError('consent');
                }}
                required
                aria-describedby={errors.consent ? 'u8-consent-error' : undefined}
              />
              <label htmlFor="u8-consent">{UNDER8_CONSENT_TEXT}</label>
            </div>
            {errors.consent && (
              <p className="cform__error" id="u8-consent-error" role="alert">
                <i className="pi pi-exclamation-circle" aria-hidden="true" />
                <span>{errors.consent}</span>
              </p>
            )}
          </div>

          <div ref={turnstileContainerRef} className="cform__turnstile" aria-label="Bot verification" />

          {submitError && (
            <p className="cform__error cform__error--submit" role="alert">
              <i className="pi pi-exclamation-triangle" aria-hidden="true" />
              <span>{submitError}</span>
            </p>
          )}

          <Button
            type="submit"
            label={submitting ? 'Submitting...' : 'Join the interest list'}
            icon="pi pi-send"
            iconPos="right"
            className="cform__submit"
            disabled={submitting}
          />
        </form>
      )}
    </section>
  );
}
