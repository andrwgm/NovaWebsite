import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';

export default function Navbar() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    requestContactModal();
  };

  const items = [
    { label: 'Assessments', command: () => navigate('/') },
    { label: 'Support', command: () => navigate('/support') },
    { label: 'About us', command: () => navigate('/about') },
    { label: 'Blog', command: () => navigate('/blog') },
    { label: 'Nova careers', command: () => navigate('/careers') },
    {
      label: 'Get in contact',
      icon: 'pi pi-send',
      className: 'menu-contact-item',
      command: handleContactClick,
    }
  ];

  return (
    <div className="topbar">
      <Menubar 
        model={items}
        pt={{
          menu: { tabIndex: -1 },
          action: ({ context }) => ({
            tabIndex: context?.disabled ? -1 : 0
          })
        }}
        start={
          <Link to="/" aria-label="Go to Nova Clinics home page">
            <Image src="/images/topbar_logo.avif" alt="Nova Clinics Logo" />
          </Link>
        }
        end={<Button label="Get in contact" icon="pi pi-send" iconPos="right" onClick={handleContactClick} />} 
      />
    </div>
  );
}  
