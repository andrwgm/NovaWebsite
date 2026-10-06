import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';

const ASSESSMENT_LINKS = [
  { label: 'Overview', path: '/' },
  { label: 'ADHD', path: '/adhd-assessment' },
  { label: 'Autism', path: '/autism-assessment' },
  { label: 'Combined', path: '/autism-adhd-assessment' },
];

function isRouteActive(pathname, path) {
  if (path === '/') {
    return pathname === '/';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

function isAssessmentsSection(pathname) {
  return ASSESSMENT_LINKS.some((link) => isRouteActive(pathname, link.path));
}

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleContactClick = () => {
    requestContactModal({ source: 'navbar' });
  };

  const items = useMemo(
    () => [
      {
        label: 'Assessments',
        className: isAssessmentsSection(pathname) ? 'is-active' : undefined,
        items: ASSESSMENT_LINKS.map((link) => ({
          label: link.label,
          className: isRouteActive(pathname, link.path) ? 'is-active' : undefined,
          command: () => navigate(link.path),
        })),
      },
      {
        label: 'Support',
        className: isRouteActive(pathname, '/support') ? 'is-active' : undefined,
        command: () => navigate('/support'),
      },
      {
        label: 'About us',
        className: isRouteActive(pathname, '/about') ? 'is-active' : undefined,
        command: () => navigate('/about'),
      },
      {
        label: 'Blog',
        className: isRouteActive(pathname, '/blog') ? 'is-active' : undefined,
        command: () => navigate('/blog'),
      },
      {
        label: 'Nova careers',
        className: isRouteActive(pathname, '/careers') ? 'is-active' : undefined,
        command: () => navigate('/careers'),
      },
      {
        label: 'Get in contact',
        icon: 'pi pi-send',
        className: 'menu-contact-item',
        command: handleContactClick,
      },
    ],
    [navigate, pathname]
  );

  return (
    <div className="topbar">
      <Menubar
        model={items}
        pt={{
          menu: { tabIndex: -1 },
          action: ({ context }) => ({
            tabIndex: context?.disabled ? -1 : 0,
          }),
        }}
        start={
          <Link to="/" aria-label="Go to Nova Clinics home page">
            <Image src="/images/topbar_logo.avif" alt="Nova Clinics Logo" />
          </Link>
        }
        end={
          <Button
            label="Get in contact"
            icon="pi pi-send"
            iconPos="right"
            onClick={handleContactClick}
          />
        }
      />
    </div>
  );
}
