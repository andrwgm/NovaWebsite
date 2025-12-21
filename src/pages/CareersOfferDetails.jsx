import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Chip } from 'primereact/chip';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
import { MultiSelect } from 'primereact/multiselect';
import { Checkbox } from 'primereact/checkbox';
import { Skeleton } from 'primereact/skeleton';
import { JOB_OFFERS_ENDPOINT } from '../utils/api';
import './careersOfferDetails.css';

const STATUS_LABELS = {
    open: 'Open',
    closed: 'Closed'
};

const COUNTRY_OPTIONS = [
    { label: 'United Kingdom', value: 'united-kingdom' },
    { label: 'Argentina', value: 'argentina' },
    { label: 'Australia', value: 'australia' },
    { label: 'Austria', value: 'austria' },
    { label: 'Belgium', value: 'belgium' },
    { label: 'Brazil', value: 'brazil' },
    { label: 'Bulgaria', value: 'bulgaria' },
    { label: 'Canada', value: 'canada' },
    { label: 'Chile', value: 'chile' },
    { label: 'China', value: 'china' },
    { label: 'Colombia', value: 'colombia' },
    { label: 'Croatia', value: 'croatia' },
    { label: 'Czech Republic', value: 'czech-republic' },
    { label: 'Denmark', value: 'denmark' },
    { label: 'Estonia', value: 'estonia' },
    { label: 'Finland', value: 'finland' },
    { label: 'France', value: 'france' },
    { label: 'Germany', value: 'germany' },
    { label: 'Greece', value: 'greece' },
    { label: 'Hungary', value: 'hungary' },
    { label: 'India', value: 'india' },
    { label: 'Indonesia', value: 'indonesia' },
    { label: 'Ireland', value: 'ireland' },
    { label: 'Israel', value: 'israel' },
    { label: 'Italy', value: 'italy' },
    { label: 'Japan', value: 'japan' },
    { label: 'Kenya', value: 'kenya' },
    { label: 'Latvia', value: 'latvia' },
    { label: 'Lithuania', value: 'lithuania' },
    { label: 'Luxembourg', value: 'luxembourg' },
    { label: 'Malaysia', value: 'malaysia' },
    { label: 'Mexico', value: 'mexico' },
    { label: 'Morocco', value: 'morocco' },
    { label: 'Netherlands', value: 'netherlands' },
    { label: 'New Zealand', value: 'new-zealand' },
    { label: 'Nigeria', value: 'nigeria' },
    { label: 'Norway', value: 'norway' },
    { label: 'Pakistan', value: 'pakistan' },
    { label: 'Peru', value: 'peru' },
    { label: 'Philippines', value: 'philippines' },
    { label: 'Poland', value: 'poland' },
    { label: 'Portugal', value: 'portugal' },
    { label: 'Romania', value: 'romania' },
    { label: 'Saudi Arabia', value: 'saudi-arabia' },
    { label: 'Singapore', value: 'singapore' },
    { label: 'South Africa', value: 'south-africa' },
    { label: 'South Korea', value: 'south-korea' },
    { label: 'Spain', value: 'spain' },
    { label: 'Sweden', value: 'sweden' },
    { label: 'Switzerland', value: 'switzerland' },
    { label: 'Thailand', value: 'thailand' },
    { label: 'Turkey', value: 'turkey' },
    { label: 'United Arab Emirates', value: 'united-arab-emirates' },
    { label: 'United States', value: 'united-states' },
    { label: 'Uruguay', value: 'uruguay' },
    { label: 'Vietnam', value: 'vietnam' },
    { label: 'Other', value: 'other' }
];

const DAY_OPTIONS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
].map((day) => ({ label: day, value: day }));

const TIME_OPTIONS = ['Mornings', 'Afternoons', 'Evenings'].map((slot) => ({
    label: slot,
    value: slot
}));

const YES_NO_VALUES = ['yes', 'no'];

export default function CareersOfferDetails() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const cvUploadRef = useRef(null);
    const coverUploadRef = useRef(null);
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: null,
        rightToWork: null,
        visaRequired: null,
        cv: null,
        coverLetter: null,
        linkedIn: '',
        registration: null,
        registrationNumber: '',
        experienceChildren: null,
        experienceAssessments: null,
        indemnityInsurance: null,
        dbs: null,
        daysAvailable: [],
        timesAvailable: [],
        consent: false,
        futureOpportunities: false,
        comments: ''
    });

    useEffect(() => {
        let isMounted = true;

        const fetchOffer = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(JOB_OFFERS_ENDPOINT);
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const payload = await response.json();
                if (isMounted) {
                    setOffers(payload.data ?? []);
                }
            } catch (err) {
                console.error('Failed to load job offer', err);
                if (isMounted) {
                    setError('No se pudo cargar la oferta. Inténtalo más tarde.');
                    setOffers([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchOffer();
        return () => {
            isMounted = false;
        };
    }, []);

    const offer = useMemo(() => {
        if (!slug) return null;
        const match = slug.match(/(.+)-(\d{4}-\d{2}-\d{2})$/);
        if (match) {
            const [, id, publishedDate] = match;
            return (
                offers.find((item) => item.id === id && item.publishedDate === publishedDate) ||
                offers.find((item) => item.id === id)
            );
        }
        return offers.find((item) => item.id === slug);
    }, [offers, slug]);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const updateField = (field, value) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value
        }));
    };

    const handleFileUpload = (field, event) => {
        const file = event.files?.[0] || null;
        updateField(field, file);
        if (event.options && typeof event.options.clear === 'function') {
            event.options.clear();
        }
    };

    const handleRemoveFile = (field, ref) => {
        ref.current?.clear();
        updateField(field, null);
    };

    const formattedDate = useMemo(() => {
        if (!offer?.publishedDate) return '';
        return new Date(offer.publishedDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }, [offer]);

    const detailItems = useMemo(() => {
        if (!offer) return [];
        return [
            { label: 'Location', value: offer.location },
            { label: 'Location Type', value: offer.locationType },
            { label: 'Employment Type', value: offer.contractType },
            { label: 'Department', value: offer.department },
            { label: 'Compensation', value: offer.compensation },
            { label: 'Status', value: offer.status, type: 'status' },
            { label: 'Published', value: formattedDate }
        ].filter((item) => Boolean(item.value));
    }, [offer, formattedDate]);

    const plainTitle = useMemo(() => {
        const title = offer?.title || '';
        const stripped = title.replace(/\s*\(.*?\)\s*/g, '').trim();
        return stripped || title;
    }, [offer]);

    const overviewHighlights = offer?.overviewHighlights || [];
    const responsibilities = offer?.responsibilities || [];
    const requirements = offer?.requirements || [];

    const handleBackToCareers = () => {
        navigate('/careers', { state: { scrollTo: 'offers' } });
    };

    const renderYesNoGroup = (field, label, name = field) => (
        <div className="offer-application__radio-group">
            <span>{label}</span>
            <div className="offer-application__radio-options">
                {YES_NO_VALUES.map((value) => (
                    <label key={value} className="offer-application__radio-option">
                        <RadioButton
                            inputId={`${name}-${value}`}
                            name={name}
                            value={value}
                            onChange={(e) => updateField(field, e.value)}
                            checked={formData[field] === value}
                        />
                        <span>{value === 'yes' ? 'Yes' : 'No'}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    const renderSkeleton = () => (
        <section className="offer-details">
            <div className="offer-details__grid">
                <aside className="offer-details__meta">
                    <button type="button" className="offer-details__back-link" onClick={handleBackToCareers}>
                        <i className="pi pi-arrow-left" aria-hidden="true"></i>
                        Back to open roles
                    </button>
                    <h1 className="offer-details__title">Loading role...</h1>

                    <div className="offer-details__attributes">
                        {[
                            { label: 'Location' },
                            { label: 'Location Type' },
                            { label: 'Employment Type' },
                            { label: 'Department' }
                        ].map((item, idx) => (
                            <Fragment key={item.label}>
                                <div className="offer-details__attribute">
                                    <p className="offer-details__attribute-label">{item.label}</p>
                                    <p className="offer-details__attribute-value">
                                        <Skeleton width="70%" />
                                    </p>
                                </div>
                                {idx < 3 && <span className="offer-details__rule" />}
                            </Fragment>
                        ))}
                    </div>
                </aside>

                <div className="offer-details__content">
                    <TabView className="offer-details__tabs" panelContainerClassName="offer-details__panels">
                        <TabPanel header="Overview">
                            <article className="offer-overview">
                                <p className="offer-details__lede">Join Nova Clinic — redefining psychological assessments for children.</p>
                                <p className="offer-details__description">
                                    <Skeleton width="100%" />
                                    <Skeleton width="95%" />
                                    <Skeleton width="85%" />
                                </p>

                                <div className="offer-overview__grid">
                                    {[
                                        'Why join Nova Clinic?',
                                        "What you'll do",
                                        "What we're looking for"
                                    ].map((heading) => (
                                        <section key={heading}>
                                            <h3>{heading}</h3>
                                            <ul>
                                                {[1, 2, 3].map((item) => (
                                                    <li key={item}>
                                                        <Skeleton width={`${80 - item * 10}%`} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    ))}
                                </div>
                            </article>
                            <article className="offer-conclusion">
                                <p className="offer-details__conclusion">
                                    <Skeleton width="90%" />
                                    <Skeleton width="85%" />
                                </p>
                            </article>
                        </TabPanel>
                        <TabPanel header="Application" disabled>
                            <article className="offer-application-card" id="offer-application">
                                <form className="offer-application">
                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">Personal details</p>
                                        <div className="offer-application__grid">
                                            {[1, 2, 3, 4].map((idx) => (
                                                <div className="offer-application__field" key={idx}>
                                                    <Skeleton width="100%" height="3rem" />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </form>
                            </article>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </section>
    );

    if (isLoading) {
        return renderSkeleton();
    }

    if (error || !offer) {
        return (
            <section className="offer-details offer-details--missing">
                <div className="offer-details__missing-card">
                    <h1 className="offer-details__missing-title">
                        {error ? 'No se pudo cargar la oferta' : 'Offer not found'}
                    </h1>
                    <p className="offer-details__missing-copy">
                        {error ||
                            "We couldn't find that opportunity. Head back to explore every open role."}
                    </p>
                    <button
                        type="button"
                        className="offer-details__back-link offer-details__back-link--inline"
                        onClick={() => navigate('/careers')}
                    >
                        <i className="pi pi-arrow-left" aria-hidden="true"></i>
                        Back to open roles
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="offer-details">
            <div className="offer-details__grid">
                <aside className="offer-details__meta">
                    <button type="button" className="offer-details__back-link" onClick={handleBackToCareers}>
                        <i className="pi pi-arrow-left" aria-hidden="true"></i>
                        Back to open roles
                    </button>
                    <h1 className="offer-details__title">{plainTitle}</h1>

                    <div className="offer-details__attributes">
                        {detailItems.map((item, index) => (
                            <Fragment key={item.label}>
                                <div className="offer-details__attribute">
                                    <p className="offer-details__attribute-label">{item.label}</p>
                                    {item.type === 'status' ? (
                                        <Chip
                                            label={STATUS_LABELS[item.value] || item.value}
                                            className={`offer-details__status offer-details__status--${item.value}`}
                                        />
                                    ) : (
                                        <p className="offer-details__attribute-value">{item.value}</p>
                                    )}
                                </div>
                                {index < detailItems.length - 1 && <span className="offer-details__rule" />}
                            </Fragment>
                        ))}
                    </div>
                </aside>

                <div className="offer-details__content">
                    <TabView className="offer-details__tabs" panelContainerClassName="offer-details__panels">
                        <TabPanel header="Overview">
                            <article className="offer-overview">
                                <p className="offer-details__lede">
                                    Join Nova Clinic — redefining psychological assessments for children.
                                </p>
                                <p className="offer-details__description">{offer.longDescription}</p>

                                <div className="offer-overview__grid">
                                    {overviewHighlights.length > 0 && (
                                        <section>
                                            <h3>Why join Nova Clinic?</h3>
                                            <ul>
                                                {overviewHighlights.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                    {responsibilities.length > 0 && (
                                        <section>
                                            <h3>What you&apos;ll do</h3>
                                            <ul>
                                                {responsibilities.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                    {requirements.length > 0 && (
                                        <section>
                                            <h3>What we&apos;re looking for</h3>
                                            <ul>
                                                {requirements.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                </div>
                            </article>
                            <article className="offer-conclusion">
                                <p className="offer-details__conclusion">Nova Clinics is an equal opportunity employer. We value diversity in all its forms and are committed to fostering an inclusive, respectful, and supportive environment for everyone who works with us. We believe that different backgrounds, perspectives, and experiences strengthen our work and help us deliver better outcomes for the families and clinicians we support.</p>
                            </article>
                        </TabPanel>
                        <TabPanel header="Application" disabled={offer.status !== 'open'}>
                            <article className="offer-application-card" id="offer-application">
                                <form className="offer-application" onSubmit={handleSubmit}>
                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">Personal details</p>
                                        <div className="offer-application__grid">
                                            <div className="offer-application__field">
                                                <label htmlFor="application-name">Full name</label>
                                                <InputText
                                                    id="application-name"
                                                    value={formData.fullName}
                                                    onChange={(e) => updateField('fullName', e.target.value)}
                                                    placeholder="Jane Doe"
                                                    required
                                                />
                                            </div>
                                            <div className="offer-application__field">
                                                <label htmlFor="application-email">Email address</label>
                                                <InputText
                                                    id="application-email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => updateField('email', e.target.value)}
                                                    placeholder="jane@youremail.com"
                                                    required
                                                />
                                            </div>
                                            <div className="offer-application__field">
                                                <label htmlFor="application-phone">Phone number</label>
                                                <InputMask
                                                    id="application-phone"
                                                    mask="+99 9999 999999"
                                                    value={formData.phone}
                                                    onChange={(e) => updateField('phone', e.value)}
                                                    placeholder="+44 7123 456789"
                                                />
                                            </div>
                                            <div className="offer-application__field">
                                                <label htmlFor="application-country">Country of residence</label>
                                                <Dropdown
                                                    id="application-country"
                                                    value={formData.country}
                                                    onChange={(e) => updateField('country', e.value)}
                                                    options={COUNTRY_OPTIONS}
                                                    placeholder="Select country"
                                                    filter
                                                    className="offer-application__dropdown"
                                                    panelClassName="offer-application__dropdown-panel"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">WORKING IN THE UK</p>
                                        {renderYesNoGroup('rightToWork', 'Do you have the legal right to work in the United Kingdom?', 'right-to-work')}
                                        {renderYesNoGroup(
                                            'visaRequired',
                                            'Do you require visa sponsorship to work in the UK?',
                                            'visa-sponsorship'
                                        )}
                                    </section>

                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">Documents</p>
                                        <div className="offer-application__grid offer-application__grid--documents">
                                            <div className="offer-application__field">
                                                <label htmlFor="application-cv">CV (PDF upload)</label>
                                                <FileUpload
                                                    ref={cvUploadRef}
                                                    id="application-cv"
                                                    mode="basic"
                                                    name="cv"
                                                    accept=".pdf"
                                                    chooseLabel={formData.cv ? 'Replace CV' : 'Upload CV'}
                                                    auto
                                                    customUpload
                                                    uploadHandler={(event) => handleFileUpload('cv', event)}
                                                    className="offer-application__upload"
                                                />
                                                {formData.cv && (
                                                    <div className="offer-application__file-chip">
                                                        <i className="pi pi-file" aria-hidden="true"></i>
                                                        <span>{formData.cv.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile('cv', cvUploadRef)}
                                                            aria-label="Remove CV"
                                                        >
                                                            <i className="pi pi-times" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="offer-application__field">
                                                <label htmlFor="application-cover">Cover letter (optional)</label>
                                                <FileUpload
                                                    ref={coverUploadRef}
                                                    id="application-cover"
                                                    mode="basic"
                                                    name="coverLetter"
                                                    accept=".pdf"
                                                    chooseLabel={formData.coverLetter ? 'Replace Cover Letter' : 'Upload Cover Letter'}
                                                    auto
                                                    customUpload
                                                    uploadHandler={(event) => handleFileUpload('coverLetter', event)}
                                                    className="offer-application__upload"

                                                />
                                                {formData.coverLetter && (
                                                    <div className="offer-application__file-chip">
                                                        <i className="pi pi-file" aria-hidden="true"></i>
                                                        <span>{formData.coverLetter.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile('coverLetter', coverUploadRef)}
                                                            aria-label="Remove cover letter"
                                                        >
                                                            <i className="pi pi-times" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="offer-application__field">
                                                <label htmlFor="application-linkedin">LinkedIn profile (optional)</label>
                                                <InputText
                                                    id="application-linkedin"
                                                    value={formData.linkedIn}
                                                    onChange={(e) => updateField('linkedIn', e.target.value)}
                                                    placeholder="https://linkedin.com/in/you"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">Professional background</p>
                                        {renderYesNoGroup(
                                            'registration',
                                            'Professional registration (HCPC or equivalent)',
                                            'professional-registration'
                                        )}
                                        <div className="offer-application__field">
                                            <label htmlFor="registration-number">Registration number (optional)</label>
                                            <InputText
                                                id="registration-number"
                                                value={formData.registrationNumber}
                                                onChange={(e) => updateField('registrationNumber', e.target.value)}
                                                placeholder="HCPC-123456"
                                            />
                                        </div>
                                        {renderYesNoGroup(
                                            'experienceChildren',
                                            'Previous experience working with children',
                                            'experience-children'
                                        )}
                                        {renderYesNoGroup(
                                            'experienceAssessments',
                                            'Experience conducting autism or ADHD assessments',
                                            'experience-assessments'
                                        )}
                                        {renderYesNoGroup(
                                            'indemnityInsurance',
                                            'Professional indemnity insurance',
                                            'indemnity-insurance'
                                        )}
                                    </section>

                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">Legal / compliance</p>
                                        {renderYesNoGroup('dbs', 'Up-to-date DBS certificate', 'dbs')}
                                    </section>

                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">Availability</p>
                                        <div className="offer-application__grid">
                                            <div className="offer-application__field">
                                                <label htmlFor="availability-days">Days available for an introductory call</label>
                                                <MultiSelect
                                                    id="availability-days"
                                                    value={formData.daysAvailable}
                                                    onChange={(e) => updateField('daysAvailable', e.value)}
                                                    options={DAY_OPTIONS}
                                                    placeholder="Mon, Tue, Wed..."
                                                    display="chip"
                                                    className="offer-application__dropdown"
                                                    panelClassName="offer-application__dropdown-panel"
                                                />
                                            </div>
                                            <div className="offer-application__field">
                                                <label htmlFor="availability-times">Time slots available</label>
                                                <MultiSelect
                                                    id="availability-times"
                                                    value={formData.timesAvailable}
                                                    onChange={(e) => updateField('timesAvailable', e.value)}
                                                    options={TIME_OPTIONS}
                                                    placeholder="Mornings, Afternoons..."
                                                    display="chip"
                                                    className="offer-application__dropdown"
                                                    panelClassName="offer-application__dropdown-panel"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <section className="offer-application__section">
                                        <div className="offer-application__field">
                                            <label htmlFor="application-comments">Additional comments (optional)</label>
                                            <InputTextarea
                                                id="application-comments"
                                                rows={4}
                                                value={formData.comments}
                                                onChange={(e) => updateField('comments', e.target.value)}
                                                placeholder="Anything else you’d like us to know that’s relevant to your application?"
                                            />
                                        </div>
                                    </section>

                                    <section className="offer-application__section">
                                        <p className="offer-application__section-title">Legal information and consent</p>
                                        <div className="offer-application__consent">
                                            <Checkbox
                                                inputId="application-consent"
                                                checked={formData.consent}
                                                onChange={(e) => updateField('consent', e.checked)}
                                                required
                                            />
                                            <label htmlFor="application-consent">
                                                I have read and understand how Nova Clinics will process my personal data for recruitment purposes, as explained in the <a href="/privacy-policy">Privacy Policy</a>.
                                            </label>
                                        </div>
                                        <div className="offer-application__consent">
                                            <Checkbox
                                                inputId="application-future-opportunities"
                                                checked={formData.futureOpportunities}
                                                onChange={(e) => updateField('futureOpportunities', e.checked)}
                                            />
                                            <label htmlFor="application-future-opportunities">
                                                I consent to Nova Clinics retaining my application details for consideration for future opportunities.
                                            </label>
                                        </div>
                                    </section>

                                    <div className="offer-application__actions">
                                        <Button type="submit" label="Submit application" className="offer-application__submit p-button-sm" icon="pi pi-send" disabled={!formData.consent || !formData.futureOpportunities} />
                                    </div>
                                </form>
                            </article>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </section>
    );
}
