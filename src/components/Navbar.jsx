import React from 'react';
import './navbar.css';

import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { requestContactModal } from '../utils/contactModalService';

export default function Navbar() {
  const handleContactClick = () => {
    requestContactModal();
  };

  const items = [
    { label: 'Assesments', url: '/'},
    { label: 'Support', url: '/support'},
    { label: 'About us', url: '/about'},
    { label: 'Resources', url: '/resources'},
    { label: 'Nova careers', url: '/careers'},
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
        start={
          <a href="/">
            <Image src="/images/topbar_logo.png" />
          </a>
        }
        end={<Button label="Get in contact" icon="pi pi-send" iconPos="right" onClick={handleContactClick} />} 
      />
    </div>
  );
}  
