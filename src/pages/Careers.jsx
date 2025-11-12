import React, { useEffect, useMemo, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import CareersJobBoard from '../components/CareersJobBoard';
import './careers.css';

const getInitialWidth = () => (typeof window === 'undefined' ? 1440 : window.innerWidth);

const getHorizontalVisible = (width) => {
    if (width < 1250) return 1;
    if (width < 1350) return 2;
    return 3;
};

const perkCards = [
    {
        id: 'remote-work',
        title: 'Flexible Remote Work',
        icon: 'pi-map-marker',
        detailIntro: 'Work from anywhere, anytime.',
        detailStrong: 'You choose your hours.',
        detailDescription: 'Design a schedule that fits your life while keeping families supported with timely, high-quality assessments.',
        color: '#32B5BC'
    },
    {
        id: 'reliable-income',
        title: 'High And Reliable Income',
        icon: 'pi-credit-card',
        detailIntro: 'Predictable pay, no surprises.',
        detailStrong: 'Transparent compensation.',
        detailDescription: 'You focus on care while we handle bookings, billing, and admin so your time translates directly into earnings.',
        color: '#32B5BC'
    },
    {
        id: 'full-support',
        title: 'We Handle The Admin',
        icon: 'pi-briefcase',
        detailIntro: 'Clinical freedom, zero admin',
        detailStrong: 'You stay focused on patients.',
        detailDescription: 'Our operations team covers paperwork, reporting, and logistics so you can concentrate on clinical impact.',
        color: '#32B5BC'
    },
    {
        id: 'community',
        title: 'Supportive Community',
        icon: 'pi-users',
        detailIntro: 'You are never on your own.',
        detailStrong: 'Peer mentorship on tap.',
        detailDescription: 'Join a network of experienced clinicians who share best practices, supervision, and ongoing professional development.',
        color: '#32B5BC'
    }
];

export default function Careers() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(getInitialWidth());

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const updateWidth = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const isVerticalCarousel = viewportWidth < 1000;
    const visibleCount = isVerticalCarousel ? 1 : getHorizontalVisible(viewportWidth);

    const carouselItems = useMemo(() => {
        if (!perkCards.length) {
            return [];
        }
        const clonesNeeded = Math.max(visibleCount - 1, 0);
        const clones = perkCards.slice(0, clonesNeeded);
        return [...perkCards, ...clones];
    }, [visibleCount]);

    const activePerk = perkCards.length
        ? perkCards[activeIndex % perkCards.length]
        : null;

    const handlePageChange = (event) => {
        const nextIndex = typeof event.page === 'number' ? event.page : 0;
        setActiveIndex(nextIndex % perkCards.length);
    };

    const cardTemplate = (perk) => (
        <div className="careers-card" style={{ backgroundColor: perk.color }}>
            <p className="careers-card__title">{perk.title}</p>
            <i className={`pi ${perk.icon}`} aria-hidden="true"></i>
        </div>
    );

    return (
        <>
            <div className="introSection">
                <div className="introSectionTitle">
                    Why join Nova Clinics?
                </div>
                <div className="introSectionContentBold">
                    &quot;When we empower clinicians, we change lives — one family at a time.&quot;
                </div>
                <div className="introSectionContent">
                    Nova Clinic was founded with a simple belief — that every child deserves timely, high-quality psychological care. We’re on a mission to make autism and ADHD assessments more accessible, compassionate, and clinically excellent across the UK.
                    <br />
                    <br />
                    Our team combines experienced psychologists with smart technology and modern systems that remove the barriers of traditional practice. By empowering clinicians with flexibility and full support, we ensure families receive the care they need, when they need it most.
                    <br />
                    <br />
                    Learn more about our culture and opportunities on LinkedIn.
                </div>
            </div>
            <div className="cardsSection">
                <div className="cardsSection__content">
                    <div className="cardsSection__details">
                        <p className="cardsSection__details-intro">{activePerk?.detailIntro}</p>
                        <p className="cardsSection__details-strong">{activePerk?.detailStrong}</p>
                        <p className="cardsSection__details-description">{activePerk?.detailDescription}</p>
                    </div>
                    <div
                        className={[
                            'cardsSection__carousel',
                            isVerticalCarousel ? 'cardsSection__carousel--vertical' : `cardsSection__carousel--count-${visibleCount}`
                        ].join(' ')}
                    >
                        <Carousel
                            key={`${isVerticalCarousel ? 'vertical' : 'horizontal'}-${visibleCount}`}
                            value={carouselItems}
                            itemTemplate={cardTemplate}
                            numVisible={visibleCount}
                            numScroll={1}
                            autoplayInterval={5000}
                            showIndicators={false}
                            showNavigators={false}
                            circular
                            orientation={isVerticalCarousel ? 'vertical' : 'horizontal'}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            <div className="infoSection">
                <div className="infoSection__image">
                    <img src="/images/bike.png" alt="Child on bike with stuffed toy" />
                </div>
                <div className="infoSection__copy">
                    <p className="infoSection__eyebrow">Redefining care, together</p>
                    <p className="infoSection__lead">
                        At Nova Clinic, we’re building a better way to deliver psychological care — one that’s faster,
                        fairer, and more human.
                    </p>
                    <ul className="infoSection__list">
                        <li><strong>Innovation with purpose</strong> — Smart systems that simplify care, not complicate it.</li>
                        <li><strong>Empathy in every step</strong> — Because great care starts with listening.</li>
                        <li><strong>Clinical integrity</strong> — Evidence-based, transparent, and ethical in every assessment.</li>
                        <li><strong>Accessibility for all</strong> — Reaching families wherever they are in the UK.</li>
                    </ul>
                    <p className="infoSection__closing">
                        We believe progress in healthcare starts when clinicians feel supported and families feel heard.
                    </p>
                </div>
            </div>
            <div className="offersSection">
                <CareersJobBoard />
            </div>
            <div className="footerSection">
                <img src="/images/balloons-kid.png" alt="Balloons kid" />
            </div>
        </>
    );
}
