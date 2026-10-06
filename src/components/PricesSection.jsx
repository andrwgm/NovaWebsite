import React, { useEffect, useRef } from 'react';
import { requestContactModal } from '../utils/contactModalService';
import { trackPricingSeen } from '../utils/googleAnalytics';
import {
    ADHD_ENQUIRY_MESSAGE,
    ADHD_PRICE,
    ADHD_RESULTS,
    AUTISM_ENQUIRY_MESSAGE,
    AUTISM_PRICE,
    AUTISM_RESULTS,
    COMBINED_ENQUIRY_MESSAGE,
    COMBINED_PRICE,
    COMBINED_RESULTS,
} from '../data/assessmentPricing';
import './pricesSection.css';

const PRICE_FORM_SOURCE = {
    autism: 'autism_price',
    adhd: 'adhd_price',
    combined: 'combined_price',
};

const PRICING_SEEN_RATIO = 0.5;
const PRICING_SEEN_DWELL_MS = 1000;

// Prices also live in index.html JSON-LD, public/llms.txt, and QuestionsAnswered FAQs.

const BENEFITS = [
    {
        id: 'team',
        icon: 'pi pi-users',
        title: 'Specialist clinical team',
        description:
            'HCPC-registered professionals working together around one complete picture.',
    },
    {
        id: 'process',
        icon: 'pi pi-list',
        title: 'Complete assessment process',
        description:
            'Questionnaires, interviews, observations and review of relevant background information.',
    },
    {
        id: 'review',
        icon: 'pi pi-eye',
        title: 'Multidisciplinary review',
        description:
            'Your evidence is considered jointly before the clinical outcome is agreed.',
    },
    {
        id: 'report',
        icon: 'pi pi-file',
        title: 'Detailed written report',
        description:
            'A clear outcome, clinical findings and personalised recommendations.',
    },
    {
        id: 'follow-up',
        icon: 'pi pi-refresh',
        title: 'Feedback and follow-up',
        description:
            'Time to discuss the outcome, ask questions and understand your next steps.',
    },
    {
        id: 'portal',
        icon: 'pi pi-box',
        title: 'Portal and support box',
        description:
            'Secure updates and documents online, plus physical resources delivered to your home.',
    },
];

const PRICE_CARDS = [
    {
        key: 'autism',
        eyebrow: 'Autism',
        title: (
            <>
                Full <span className="priceCardItalic">Autism</span> Assessment
            </>
        ),
        description:
            'A comprehensive assessment exploring communication, social interaction, development and everyday experiences.',
        price: AUTISM_PRICE.display,
        components: [
            'ADOS-2-informed observation',
            'ADI-R-informed developmental interview',
            'Developmental and social-context evidence',
        ],
        resultsLead: AUTISM_RESULTS.lead,
        resultsRest: AUTISM_RESULTS.rest,
        cta: 'Enquire about Autism assessment',
        message: AUTISM_ENQUIRY_MESSAGE,
    },
    {
        key: 'combined',
        eyebrow: 'Combined pathway',
        title: (
            <>
                <span className="priceCardItalic">Autism</span>
                {' + '}
                <span className="priceCardItalic">ADHD</span> Assessment
            </>
        ),
        description:
            'One coordinated assessment exploring both profiles and how they may interact.',
        price: COMBINED_PRICE.display,
        components: [
            'All Autism assessment components',
            'All ADHD assessment components',
            'One integrated Autism and ADHD formulation',
        ],
        resultsLead: COMBINED_RESULTS.lead,
        resultsRest: COMBINED_RESULTS.rest,
        cta: 'Enquire about Combined assessment',
        message: COMBINED_ENQUIRY_MESSAGE,
    },
    {
        key: 'adhd',
        eyebrow: 'ADHD',
        title: (
            <>
                Full <span className="priceCardItalic">ADHD</span> Assessment
            </>
        ),
        description:
            'A thorough assessment exploring attention, activity levels, impulsivity and their impact on everyday life.',
        price: ADHD_PRICE.display,
        components: [
            'DIVA or ACE clinical interview',
            'Structured ADHD questionnaires',
            'Developmental and social-context evidence',
        ],
        resultsLead: ADHD_RESULTS.lead,
        resultsRest: ADHD_RESULTS.rest,
        cta: 'Enquire about ADHD assessment',
        message: ADHD_ENQUIRY_MESSAGE,
    },
];

function PriceCard({ card }) {
    const cardRef = useRef(null);

    useEffect(() => {
        const node = cardRef.current;
        if (!node || typeof IntersectionObserver === 'undefined') {
            return undefined;
        }

        let dwellTimer = null;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry) {
                    return;
                }
                if (entry.isIntersecting && entry.intersectionRatio >= PRICING_SEEN_RATIO) {
                    if (dwellTimer != null) {
                        return;
                    }
                    dwellTimer = window.setTimeout(() => {
                        dwellTimer = null;
                        trackPricingSeen({ item_id: card.key });
                        observer.disconnect();
                    }, PRICING_SEEN_DWELL_MS);
                    return;
                }
                if (dwellTimer != null) {
                    window.clearTimeout(dwellTimer);
                    dwellTimer = null;
                }
            },
            { threshold: PRICING_SEEN_RATIO },
        );

        observer.observe(node);
        return () => {
            if (dwellTimer != null) {
                window.clearTimeout(dwellTimer);
            }
            observer.disconnect();
        };
    }, [card.key]);

    return (
        <article
            ref={cardRef}
            className="priceCard"
            data-key={card.key}
        >
            <p className="priceCardEyebrow">{card.eyebrow}</p>
            <h3 className="priceCardTitle">{card.title}</h3>
            <p className="priceCardIntro">{card.description}</p>
            <div className="priceCardDivider" />
            <p className="priceCardPrice">{card.price}</p>
            <div className="priceCardDivider" />
            <p className="priceCardSectionTitle">Clinical components</p>
            <ul className="priceCardList">
                {card.components.map((item) => (
                    <li className="priceCardListItem" key={item}>
                        <i className="pi pi-check-circle" aria-hidden="true" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
            <p className="priceCardSectionTitle priceCardSectionTitle--results">
                <i className="pi pi-clock" aria-hidden="true" />
                Results
            </p>
            <p className="priceCardResults">
                {card.resultsLead}
                {' '}
                {card.resultsRest}
            </p>
            <button
                type="button"
                className="priceCardCta"
                onClick={() => requestContactModal({
                    message: card.message,
                    source: PRICE_FORM_SOURCE[card.key],
                    itemId: card.key,
                })}
            >
                {card.cta}
            </button>
        </article>
    );
}

export default function PricesSection() {
    return (
        <section className="pricesOffer" aria-labelledby="prices-intro-title">
            <header className="pricesIntro">
                <h2 className="pricesIntroTitle" id="prices-intro-title">
                    <span className="pricesIntroTitleLine">More than an</span>
                    <span className="pricesIntroTitleLine pricesIntroTitleLineIndented pricesIntroTitleItalic">
                        appointment
                    </span>
                </h2>
                <p className="pricesEyebrow">
                    One assessment fee. Your complete assessment pathway included.
                </p>
                <p className="pricesIntroCopy">
                    The prices below cover the full assessment pathway, not only your appointments.
                    Everything shown here is included in the stated price, with no required
                    assessment add-ons.
                </p>
            </header>

            <div className="pricesBenefitsBand">
                <div className="pricesBenefitsStripe" aria-hidden="true" />
                <div className="pricesBenefitsPanel">
                    <ul className="pricesBenefitsGrid">
                        {BENEFITS.map((benefit) => (
                            <li className="pricesBenefit" key={benefit.id}>
                                <span className="pricesBenefitIcon" aria-hidden="true">
                                    <i className={benefit.icon} />
                                </span>
                                <h3 className="pricesBenefitTitle">{benefit.title}</h3>
                                <p className="pricesBenefitCopy">{benefit.description}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="pricesBenefitsNotes">
                        <p className="pricesBenefitsNote">
                            <span className="pricesBenefitsNoteIcon" aria-hidden="true">
                                <i className="pi pi-truck" />
                            </span>
                            UK delivery of your support box is included.
                        </p>
                        <p className="pricesBenefitsNote">
                            <span className="pricesBenefitsNoteIcon" aria-hidden="true">
                                <i className="pi pi-info-circle" />
                            </span>
                            Nova Clinics provides diagnostic assessments and post-assessment
                            guidance; medication and ongoing treatment are not included
                        </p>
                    </div>
                </div>
            </div>

            <section className="pricesChoose" aria-labelledby="choose-assessment-title">
                <div className="pricesChooseHeader">
                    <h2 className="pricesChooseTitle" id="choose-assessment-title">
                        <span className="pricesChooseTitleLine">Choose your</span>
                        <span className="pricesChooseTitleLine pricesChooseTitleLineIndented pricesChooseTitleItalic">
                            Assessment
                        </span>
                    </h2>
                    <div className="pricesChooseCopy">
                        <p className="pricesEyebrow pricesEyebrow--start">Assessment options</p>
                        <p className="pricesChooseText">
                            Choose the assessment pathway that best reflects what you would like to
                            explore. If you are unsure which option is right, our team can guide
                            you.
                        </p>
                    </div>
                </div>

                <div className="pricesSectionContent">
                    {PRICE_CARDS.map((card) => (
                        <PriceCard key={card.key} card={card} />
                    ))}
                </div>
            </section>
        </section>
    );
}
