import React from 'react';
import './pricesSection.css';


export default function PricesSection() {
    return (
        <div className="pricesSection">
            <div className="pricesSectionTitle">
                What we offer
            </div>
            <div className="pricesSectionContent">
                <div className="priceCard">
                    <div className="priceCardTitle">
                        Full ASC<br />assessment
                    </div>
                    <div className="priceCardTextSubtitle">
                        What's included
                    </div>
                    <div className="priceCardText">
                        ADOS-2, parent interview, teacher input, report, feedback
                    </div>
                    <div className="priceCardTextSubtitle">
                        Turnaround
                    </div>
                    <div className="priceCardText">
                        10 working days
                    </div>
                    <div className='priceCardPill'>
                        PRICE £1.600
                    </div>
                </div>

                <div className="priceCard">
                    <div className="priceCardTitle">
                        Full ADHD<br />assessment
                    </div>
                    <div className="priceCardTextSubtitle">
                        What's included
                    </div>
                    <div className="priceCardText">
                        Conners-4, QbCheck, clinical interview, report, feedback
                    </div>
                    <div className="priceCardTextSubtitle">
                        Turnaround
                    </div>
                    <div className="priceCardText">
                        10 working days
                    </div>
                    <div className='priceCardPill'>
                        PRICE £1.800
                    </div>
                </div>

                <div className="priceCard">
                    <div className="priceCardTitle">
                        Combined<br />ASC + ADHD
                    </div>
                    <div className="priceCardTextSubtitle">
                        What's included
                    </div>
                    <div className="priceCardText">
                        Both batteries, single<br />integrated report
                    </div>
                    <div className="priceCardTextSubtitle">
                        Turnaround
                    </div>
                    <div className="priceCardText">
                        10 working days
                    </div>
                    <div className='priceCardPill'>
                        PRICE £2.600
                    </div>
                </div>
            </div>
            <div className="pricesSectionFooterTitle">
                Early Adopter Discount <b>- 10 %</b> on the <b>first 50 appointments</b>
            </div>
            <div className="pricesSectionFooterText">
                Payment plans available. Nova Clinics is a registered provider with major UK health insurers.
            </div>
        </div>
    );
}  