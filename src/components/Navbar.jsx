import React from 'react';
import './navbar.css';

import { Menubar } from 'primereact/menubar';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';

export default function Navbar({ activeIndex, onTabChange }) {
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const items = [
    { label: 'Families', url: '/hola'},
    { label: 'Assesments'},
    { label: 'About us'},
    { label: 'Resources'},
    { label: 'Nova careers'},
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
