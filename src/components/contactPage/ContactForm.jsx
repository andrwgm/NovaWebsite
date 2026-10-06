import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import ApplicationSuccessModal from '../ApplicationSuccessModal';
import ContactVacationModal from '../ContactVacationModal';
import { CONTACT_FORM_RESPONSE_MODE } from '../../config/contactFormResponse';
import {
  CHILD_COPY,
  CONTACT_AUDIENCES,
  CONTACT_SERVICES,
  PRIVATE_SERVICE_CHECK,
  WAITLIST_MESSAGE,
  waitlistAvailable,
} from '../../data/contactPage';
import { ASSESSMENT_MIN_AGE } from '../../data/assessmentPricing';
import { CONTACT_SUBMISSIONS_ENDPOINT } from '../../utils/api';
import { formatUkPhone } from '../../utils/formatUkPhone';
import { trackContactFormOpen, trackGenerateLead } from '../../utils/googleAnalytics';
import { trackMetaFormStart } from '../../utils/metaPixel';
import { getEnquiryAttributionPayload } from '../../utils/enquiryAttribution';
import { TURNSTILE_CONTACT_ACTION, TURNSTILE_SITE_KEY, whenTurnstileReady } from '../../utils/turnstile';
import './contactForm.css';

const INITIAL_DETAILS = {
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
  website: '',
};

/** Inline validation message: icon + text, announced to screen readers. */
function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p className="cform__error" id={id} role="alert">
      <i className="pi pi-exclamation-circle" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/**
 * The enquiry form of /contact. It sends the same payload as the old pop-up (including the
 * Turnstile token, the honeypot and the first-party attribution) plus the service, who the
 * assessment is for and the acknowledgements.
 *
 * `request` is the resolved router state from requestContact() (see resolveContactRequest);
 * it is a new object every time a contact button is pressed, which re-applies the pre-made
 * message and the pre-selected service.
 */
export default function ContactForm({ request }) {
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [service, setService] = useState(request.service);
  const [audience, setAudience] = useState(request.audience);
  const [waitlist, setWaitlist] = useState(request.waitlist);
  const [ageAcknowledged, setAgeAcknowledged] = useState(false);
  const [privateAcknowledged, setPrivateAcknowledged] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const formStartTracked = useRef(false);
  const isFirstRequest = useRef(true);

  const { source, itemId } = request;

  // A contact button was pressed (or the page was opened): apply its defaults.
  useEffect(() => {
    formStartTracked.current = false;
    setService(request.service);
    setAudience(request.audience);
    setWaitlist(request.waitlist);
    setAgeAcknowledged(false);
    setErrors({});
    setDetails((prev) => ({
      ...prev,
      // Keep what the visitor already typed when a button without a message is pressed.
      message: request.message || (isFirstRequest.current ? '' : prev.message),
    }));
    isFirstRequest.current = false;
    trackContactFormOpen({ form_source: request.source, item_id: request.itemId });
  }, [request]);

  // Turnstile lives as long as the form is on screen.
  useEffect(() => {
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
  }, []);

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

  const trackFormStartOnce = () => {
    if (formStartTracked.current) return;
    formStartTracked.current = true;
    trackMetaFormStart({ form_source: source, item_id: itemId });
  };

  const handleFieldFocus = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
    if (target.id === 'contact-website') return;
    if (target.getAttribute('type') !== 'checkbox') {
      trackFormStartOnce();
    }
  };

  const handleDetailChange = (field) => (event) => {
    setDetails((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handlePhoneChange = (event) => {
    setDetails((prev) => ({ ...prev, phone: formatUkPhone(event.target.value) }));
  };

  const handleServiceChange = (nextService) => {
    setService(nextService);
    clearError('service');
    if (!waitlistAvailable(nextService) && waitlist) {
      setWaitlist(false);
      setDetails((prev) => (prev.message === WAITLIST_MESSAGE ? { ...prev, message: '' } : prev));
    }
  };

  const handleAudienceChange = (nextAudience) => {
    setAudience(nextAudience);
    clearError('audience');
    if (nextAudience !== 'child') {
      setAgeAcknowledged(false);
      clearError('age');
      if (waitlist) {
        setWaitlist(false);
        setDetails((prev) => (prev.message === WAITLIST_MESSAGE ? { ...prev, message: '' } : prev));
      }
    }
  };

  const handleWaitlistChange = (checked) => {
    setWaitlist(checked);
    clearError('age');
    if (checked) {
      setAgeAcknowledged(false);
      // Offer the same pre-made text as the waiting list buttons when the box is still empty.
      setDetails((prev) => (prev.message.trim() ? prev : { ...prev, message: WAITLIST_MESSAGE }));
    } else {
      setDetails((prev) => (prev.message === WAITLIST_MESSAGE ? { ...prev, message: '' } : prev));
    }
  };

  const validate = () => {
    const next = {};
    if (!service) next.service = 'Please choose the assessment you are interested in.';
    if (!audience) next.audience = 'Please tell us who the assessment is for.';
    if (audience === 'child' && !waitlist && !ageAcknowledged) {
      next.age = `Please confirm that you understand the service is for ages ${ASSESSMENT_MIN_AGE} and over, or join the waiting list.`;
    }
    if (!details.consent) next.consent = 'Please accept the privacy policy to continue.';
    if (!privateAcknowledged) next.private = 'Please confirm that you understand this is a private service.';
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector('.is-invalid') || document.querySelector('.cform__error');
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    if (!turnstileToken) {
      setSubmitError('Please complete the verification before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const attribution = getEnquiryAttributionPayload();
      // The form lives on /contact, so "landing_page" would always be this page. Keep the page
      // where the visitor pressed the contact button (the page they were really reading).
      if (request.from && attribution.landing_page) {
        attribution.landing_page = `${window.location.origin}${request.from}`.slice(0, 2048);
      }

      const response = await fetch(CONTACT_SUBMISSIONS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          phone: details.phone || 'Not provided',
          message: details.message || 'Not provided',
          consent: Boolean(details.consent),
          attribution,
          'cf-turnstile-response': turnstileToken,
          website: details.website,
          service_interest: service,
          enquiry_for: audience,
          age_requirement_acknowledged: audience === 'child' && !waitlist ? true : null,
          private_service_acknowledged: true,
          hybrid_waitlist_requested: waitlist,
          form_source: source,
        }),
      });

      if (!response.ok) {
        resetTurnstile();
        throw new Error(`Request failed with status ${response.status}`);
      }

      trackGenerateLead({
        method: 'contact_form',
        form_source: source,
        item_id: itemId || (service !== 'unsure' ? service : undefined),
      });
      setDetails(INITIAL_DETAILS);
      setService('');
      setAudience('');
      setWaitlist(false);
      setAgeAcknowledged(false);
      setPrivateAcknowledged(false);
      setErrors({});
      resetTurnstile();
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Failed to submit contact form', error);
      resetTurnstile();
      setSubmitError('We could not send your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showChildBlock = audience === 'child';
  const canJoinWaitlist = showChildBlock && waitlistAvailable(service);

  let childNote = null;
  if (service === 'adhd') childNote = CHILD_COPY.adhdNote;
  if (service === 'combined') childNote = CHILD_COPY.combinedNote;

  return (
    <>
      <form
        className="cform"
        onSubmit={handleSubmit}
        onFocus={handleFieldFocus}
        aria-label="Contact form"
      >
        {/* 1. The assessment */}
        <fieldset className="cform__section">
          <legend className="cform__legend">
            <span className="cform__step" aria-hidden="true">1</span>
            About the assessment
          </legend>

          <p className="cform__question" id="cform-service-label">
            Which service are you interested in?
          </p>
          <div
            className={`cform__cards${errors.service ? ' is-invalid' : ''}`}
            role="radiogroup"
            aria-labelledby="cform-service-label"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'cform-service-error' : undefined}
          >
            {CONTACT_SERVICES.map((option) => (
              <label
                key={option.id}
                className={`cform__card${service === option.id ? ' is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name="service"
                  className="cform__card-input"
                  value={option.id}
                  checked={service === option.id}
                  onChange={() => handleServiceChange(option.id)}
                />
                <span className="cform__card-icon" aria-hidden="true">
                  <i className={option.icon} />
                </span>
                <span className="cform__card-text">
                  <span className="cform__card-title">{option.label}</span>
                  <span className="cform__card-desc">{option.description}</span>
                </span>
                {option.price && <span className="cform__card-price">{option.price}</span>}
                <i className="pi pi-check-circle cform__card-check" aria-hidden="true" />
              </label>
            ))}
          </div>
          <FieldError id="cform-service-error">{errors.service}</FieldError>

          <p className="cform__question" id="cform-audience-label">
            Who are you looking for the assessment for?
          </p>
          <div
            className={`cform__segmented${errors.audience ? ' is-invalid' : ''}`}
            role="radiogroup"
            aria-labelledby="cform-audience-label"
            aria-invalid={Boolean(errors.audience)}
            aria-describedby={errors.audience ? 'cform-audience-error' : undefined}
          >
            {CONTACT_AUDIENCES.map((option) => (
              <label
                key={option.id}
                className={`cform__segment${audience === option.id ? ' is-selected' : ''}`}
              >
                <input
                  type="radio"
                  name="audience"
                  className="cform__card-input"
                  value={option.id}
                  checked={audience === option.id}
                  onChange={() => handleAudienceChange(option.id)}
                />
                <i className={option.icon} aria-hidden="true" />
                {option.label}
              </label>
            ))}
          </div>
          <FieldError id="cform-audience-error">{errors.audience}</FieldError>

          {showChildBlock && (
            <div className="cform__child" role="group" aria-label="Assessments for children">
              <div className={`cform__check${errors.age ? ' is-invalid' : ''}`}>
                <Checkbox
                  inputId="contact-age"
                  checked={ageAcknowledged}
                  disabled={waitlist}
                  onChange={(event) => {
                    setAgeAcknowledged(event.checked);
                    clearError('age');
                  }}
                />
                <label htmlFor="contact-age">{CHILD_COPY.ageCheck}</label>
              </div>
              <FieldError id="cform-age-error">{errors.age}</FieldError>

              {childNote && (
                <p className="cform__note">
                  <i className="pi pi-info-circle" aria-hidden="true" />
                  <span>{childNote}</span>
                </p>
              )}

              {canJoinWaitlist && (
                <div className={`cform__waitlist${waitlist ? ' is-active' : ''}`}>
                  <p className="cform__note">
                    <i className="pi pi-clock" aria-hidden="true" />
                    <span>{CHILD_COPY.waitlistText}</span>
                  </p>
                  <div className="cform__check">
                    <Checkbox
                      inputId="contact-waitlist"
                      checked={waitlist}
                      onChange={(event) => handleWaitlistChange(event.checked)}
                    />
                    <label htmlFor="contact-waitlist">{CHILD_COPY.waitlistCheck}</label>
                  </div>
                </div>
              )}
            </div>
          )}
        </fieldset>

        {/* 2. Their details */}
        <fieldset className="cform__section">
          <legend className="cform__legend">
            <span className="cform__step" aria-hidden="true">2</span>
            Your details
          </legend>

          <div className="cform__fields">
            <span className="p-float-label">
              <InputText
                id="contact-name"
                autoComplete="name"
                value={details.name}
                onChange={handleDetailChange('name')}
                required
              />
              <label htmlFor="contact-name">Full name</label>
            </span>

            <div className="cform__hp" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={details.website}
                onChange={handleDetailChange('website')}
              />
            </div>

            <div className="cform__row">
              <span className="p-float-label">
                <InputText
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={details.email}
                  onChange={handleDetailChange('email')}
                  required
                />
                <label htmlFor="contact-email">Email address</label>
              </span>

              <span className="p-float-label">
                <InputText
                  id="contact-phone"
                  inputMode="tel"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={handlePhoneChange}
                  placeholder="+44 7700 900123"
                />
                <label htmlFor="contact-phone">Phone (UK) (optional)</label>
              </span>
            </div>
            <p className="cform__hint">
              Leave out the first 0. For example, 07700 900123 is +44 7700 900123.
            </p>

            <span className="p-float-label cform__textarea">
              <InputTextarea
                id="contact-message"
                rows={5}
                value={details.message}
                onChange={handleDetailChange('message')}
                required
              />
              <label htmlFor="contact-message">How can we help?</label>
            </span>
            <p className="cform__hint cform__hint--warning">
              <i className="pi pi-lock" aria-hidden="true" />
              Please do not include any medical or sensitive health information in this form.
            </p>
          </div>
        </fieldset>

        {/* 3. Confirmations */}
        <fieldset className="cform__section">
          <legend className="cform__legend">
            <span className="cform__step" aria-hidden="true">3</span>
            Before you send
          </legend>

          <div className="cform__checks">
            <div className={`cform__check${errors.private ? ' is-invalid' : ''}`}>
              <Checkbox
                inputId="contact-private"
                checked={privateAcknowledged}
                onChange={(event) => {
                  setPrivateAcknowledged(event.checked);
                  clearError('private');
                }}
              />
              <label htmlFor="contact-private">{PRIVATE_SERVICE_CHECK}</label>
            </div>
            <FieldError id="cform-private-error">{errors.private}</FieldError>

            <div className={`cform__check${errors.consent ? ' is-invalid' : ''}`}>
              <Checkbox
                inputId="contact-consent"
                checked={details.consent}
                onChange={(event) => {
                  setDetails((prev) => ({ ...prev, consent: event.checked }));
                  clearError('consent');
                }}
              />
              <label htmlFor="contact-consent">
                I have read and understood the{' '}
                <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>
                {' '}and agree to the processing of my personal data for the purpose of responding to my enquiry.
              </label>
            </div>
            <FieldError id="cform-consent-error">{errors.consent}</FieldError>
          </div>

          <div
            ref={turnstileContainerRef}
            className="cform__turnstile"
            aria-label="Bot verification"
          />

          {submitError && (
            <p className="cform__error cform__error--submit" role="alert">
              <i className="pi pi-exclamation-triangle" aria-hidden="true" />
              <span>{submitError}</span>
            </p>
          )}

          <Button
            type="submit"
            label={isSubmitting ? 'Submitting...' : 'Send enquiry'}
            icon="pi pi-send"
            iconPos="right"
            className="cform__submit"
            disabled={isSubmitting}
          />
        </fieldset>
      </form>

      {CONTACT_FORM_RESPONSE_MODE === 'standard' && (
        <ApplicationSuccessModal
          visible={submitSuccess}
          onClose={() => setSubmitSuccess(false)}
          message="Done! We'll get back to you by email as soon as possible. Please keep an eye on your inbox."
        />
      )}
      {CONTACT_FORM_RESPONSE_MODE === 'vacation' && (
        <ContactVacationModal
          visible={submitSuccess}
          onClose={() => setSubmitSuccess(false)}
        />
      )}
    </>
  );
}
