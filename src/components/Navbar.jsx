import React, { useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';

function isRouteActive(pathname, path) {
  if (path === '/') {
    return pathname === '/';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleContactClick = () => {
    requestContactModal();
  };

  const items = useMemo(
    () => [
      {
        label: 'Assessments',
        className: isRouteActive(pathname, '/') ? 'is-active' : undefined,
        command: () => navigate('/'),
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
