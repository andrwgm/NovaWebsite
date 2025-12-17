import React, { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import careerOffers from '../data/careerOffers.json';
import './careersJobBoard.css';

export default function CareersJobBoard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState(null);
    const navigate = useNavigate();

    const departments = useMemo(() => {
        const uniqueDepartments = Array.from(new Set(careerOffers.map((offer) => offer.department)));
        return uniqueDepartments.map((dept) => ({ label: dept, value: dept }));
    }, []);

    const filteredOffers = useMemo(() => {
        return careerOffers.filter((offer) => {
            const matchesDepartment = departmentFilter ? offer.department === departmentFilter : true;
            if (!matchesDepartment) return false;

            if (!searchQuery) return true;

            const needle = searchQuery.toLowerCase();
            return [
                offer.title,
                offer.department,
                offer.location,
                offer.contractType,
                offer.shortDescription,
                offer.compensation
            ].some((field) => field.toLowerCase().includes(needle));
        });
    }, [departmentFilter, searchQuery]);

    const handleViewOffer = useCallback((offer) => {
        const slug = offer.publishedDate ? `${offer.id}-${offer.publishedDate}` : offer.id;
        navigate(`/careers/${slug}`);
    }, [navigate]);

    const jobTemplate = (offer) => (
        <div className="careers-offers__row">
            <div className="careers-offers__icon">
                <i className={`pi ${offer.icon}`} aria-hidden="true"></i>
            </div>
            <div className="careers-offers__details">
                <p className="careers-offers__role">{offer.title}</p>
                <p className="careers-offers__meta">
                    <span>{offer.contractType}</span>
                    <span>•</span>
                    <span>{offer.location}</span>
                </p>
                <p className="careers-offers__summary">{offer.shortDescription}</p>
            </div>
            <button
                type="button"
                className="careers-offers__cta"
                onClick={() => handleViewOffer(offer)}
                aria-label={`View ${offer.title}`}
            >
                View
                <i className="pi pi-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    );

    const jobCountLabel = `${filteredOffers.length} ${filteredOffers.length === 1 ? 'Job' : 'Jobs'}`;

    return (
        <section className="careers-offers">
            <header className="careers-offers__header">
                <p className="careers-offers__eyebrow">Career Opportunities</p>
                <h2 className="careers-offers__title">
                    Learn more about our culture and team experience on our{' '}
                    <a href="https://www.linkedin.com/company/novaclinicsuk/" target="_blank" rel="noreferrer">LinkedIn page</a>.
                </h2>
            </header>

            <div className="careers-offers__toolbar">
                <p className="careers-offers__count">{jobCountLabel}</p>
                <div className="careers-offers__filters">
                    <span className="careers-offers__search">
                        <i className="pi pi-search" aria-hidden="true"></i>
                        <InputText
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            aria-label="Search job titles"
                        />
                    </span>
                    <Dropdown
                        value={departmentFilter}
                        options={departments}
                        onChange={(e) => setDepartmentFilter(e.value)}
                        placeholder="Department"
                        showClear
                        className="careers-offers__dropdown"
                        panelClassName="careers-offers__dropdown-panel"
                        aria-label="Filter by department"
                    />
                </div>
            </div>

            <DataTable
                value={filteredOffers}
                dataKey="id"
                className="careers-offers__table"
                emptyMessage="No openings match that search just yet."
            >
                <Column body={jobTemplate} />
            </DataTable>
        </section>
    );
}
