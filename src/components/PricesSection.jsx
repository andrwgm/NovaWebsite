import React, { useEffect, useRef, useState } from 'react';
import { requestContactModal } from '../utils/contactModalService';
import './pricesSection.css';

const PORTAL_FEATURES = [
    {
        icon: 'pi pi-envelope',
        text: 'Secure direct messaging with your clinical team',
    },
    {
        icon: 'pi pi-file',
        text: 'Upload and access all documents, reports, assessment results, and additional resources',
    },
    {
        icon: 'pi pi-bell',
        text: 'Real-time notifications and updates throughout the assessment process',
    },
];

const PRICE_CARDS = [
    {
        key: 'autism',
        title: (
            <>
                Full <span className="priceCardItalic">Autism</span>
                <br />
                Assessment
            </>
        ),
        description:
            'Receive a comprehensive autism assessment with evidence-based tools, a detailed diagnostic report, and personalised post-assessment support.',
        price: '£2,400',
        included: [
            'ADOS - 2 informed observation',
            'ADI-R informed parent interview',
            'Social context input',
            'Report',
            'Feedback',
            'Post-assessment follow-up',
            { type: 'portal' },
        ],
        turnaround:
            'Your assessment results will be carefully prepared and shared within approximately 10 working days.',
        message:
            "\n[You're welcome to edit this message if you wish]\n\nHello, I would like to receive more information and proceed with the Full Autism Assessment. I'm interested in understanding the next steps, availability, and how to begin the assessment process. Thank you.",
    },
    {
        key: 'adhd',
        title: (
            <>
                Full <span className="priceCardItalic">ADHD</span>
                <br />
                Assessment
            </>
        ),
        description:
            'Undergo a thorough ADHD assessment through clinical interviews and structured questionnaires, followed by a clear report and tailored aftercare.',
        price: '£1,800',
        included: [
            'DIVA or ACE interview',
            'Social context input',
            'Report',
            'Feedback',
            'Post-assessment follow-up',
            { type: 'portal' },
            { type: 'spacer' },
        ],
        turnaround:
            'Your assessment results will be carefully prepared and shared within approximately 10 working days.',
        message:
            "\n[You're welcome to edit this message if you wish]\n\nHello, I would like to receive more information and proceed with the Full ADHD Assessment. I'd appreciate details on the next steps, timelines, and how to move forward with the assessment. Thank you.",
    },
    {
        key: 'combined',
        title: (
            <>
                Combined
                <br />
                <span className="priceCardItalic">Autism + ADHD</span>
            </>
        ),
        description:
            'A complete dual assessment for autism and ADHD, integrating validated tools, expert clinical insight, and personalised ongoing support.',
        price: '£3,200',
        included: [
            'ADOS - 2 informed observation',
            'ADI-R informed parent interview',
            'DIVA or ACE interview',
            'Social context input',
            'Report',
            'Feedback',
            'Post-assessment follow-up',
            { type: 'portal' },
        ],
        turnaround:
            'Your assessment results will be carefully prepared and shared within approximately 15 working days.',
        message:
            "\n[You're welcome to edit this message if you wish]\n\nHello, I would like to receive more information and proceed with the Combined Autism and ADHD Assessment. I'm keen to understand the process, next steps, and how to start. Thank you.",
    },
];

const renderIncludedItem = (item) => {
    if (typeof item === 'string') {
        return (
            <li className="priceCardListItem" key={item}>
                <i className="pi pi-check-circle" aria-hidden="true" />
                <span>{item}</span>
            </li>
        );
    }

    if (item?.type === 'portal') {
        return (
            <li className="priceCardListItem priceCardListItemPortal" key="portal">
                <i className="pi pi-check-circle" aria-hidden="true" />
                <div className="priceCardPortalContent">
                    <span>Dedicated client portal:</span>
                    <ul className="priceCardSubList">
                        {PORTAL_FEATURES.map((feature) => (
                            <li className="priceCardSubItem" key={feature.text}>
                                <i className={feature.icon} aria-hidden="true" />
                                <span>{feature.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    }

    if (item?.type === 'spacer') {
        return (
            <li
                className="priceCardListItem priceCardListItemSpacer"
                key="spacer"
                aria-hidden="true"
            />
        );
    }

    return null;
};

export default function PricesSection() {
    const contentRef = useRef(null);
    const [isThreeColumn, setIsThreeColumn] = useState(false);

    useEffect(() => {
        const container = contentRef.current;
        if (!container || typeof window === 'undefined') {
            return undefined;
        }

        const computeLayout = () => {
            const styles = window.getComputedStyle(container);
            const gapValue = styles.columnGap || styles.gap || '0px';
            const gap = parseFloat(gapValue);
            const card = container.querySelector('.priceCard');
            const minWidth = card ? parseFloat(window.getComputedStyle(card).minWidth) : 0;
            const width = container.clientWidth;
            const canFitThree = minWidth > 0 && width >= minWidth * 3 + gap * 2;
            setIsThreeColumn(canFitThree);
        };

        computeLayout();
        const observer = new ResizeObserver(() => {
            window.requestAnimationFrame(computeLayout);
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="pricesSection">
            <div className="pricesSectionTitle">
                What we <span className="pricesSectionTitleItalic">offer</span>
            </div>
            <div
                className={`pricesSectionContent${isThreeColumn ? ' pricesSectionContent--three' : ''}`}
                ref={contentRef}
            >
                {PRICE_CARDS.map((card) => (
                    <div
                        key={card.key}
                        className="priceCard"
                        data-key={card.key}
                    >
                        <div className="priceCardHeader">
                            <div className="priceCardTitle">{card.title}</div>
                            <div className="priceCardDivider" />
                            <p className="priceCardIntro">{card.description}</p>
                        </div>
                        <div className="priceCardDivider" />
                        <div className="priceCardPrice">{card.price}</div>
                        <div className="priceCardDivider" />
                        <div className="priceCardSectionTitle">WHATS INCLUDED:</div>
                        <ul className="priceCardList">
                            {card.included.map((item) => renderIncludedItem(item))}
                        </ul>
                        <div className="priceCardSectionTitle">EST. TURNAROUND:</div>
                        <div className="priceCardTurnaround">
                            <i className="pi pi-clock" aria-hidden="true" />
                            <span>{card.turnaround}</span>
                        </div>
                        <div className="priceCardDivider" />
                        <button
                            type="button"
                            className="priceCardCta"
                            onClick={() => requestContactModal({ message: card.message })}
                        >
                            GET STARTED
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
