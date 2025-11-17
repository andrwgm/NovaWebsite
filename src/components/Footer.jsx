import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const SOCIAL_LINKS = [
  { icon: 'pi pi-instagram', label: 'Instagram', href: '#' },
  { icon: 'pi pi-linkedin', label: 'LinkedIn', href: '#' },
  { icon: 'pi pi-youtube', label: 'YouTube', href: '#' },
  { icon: 'pi pi-tiktok', label: 'TikTok', href: '#' },
];

const LINK_COLUMNS = [
  {
    title: 'Assessments',
    links: [
      { label: 'Why choose us', to: '/#why-choose-us' },
      { label: 'Is this for me?', to: '/#is-this-for-me' },
      { label: 'Pricing', to: '/#pricing' },
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'FAQs', to: '/#faqs' },
      { label: 'People behind', to: '/#people-behind' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Before the assessment', to: '/support#before-the-assessment' },
      { label: 'After the assessment', to: '/support#after-the-assessment' },
      { label: 'Supporting your child at home', to: '/support#supporting-your-child-at-home' },
      { label: "You're not alone", to: '/support#youre-not-alone' },
    ],
  },
  {
    title: 'Nova',
    links: [
      { label: 'Meet the team', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Best practices', href: '#' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Privacy', to: '/privacy-policy' },
      { label: 'Cookies', to: '/cookies-policy' },
      { label: 'Terms and conditions', to: '/terms-and-conditions' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/icon_white_letters.png" alt="Nova Clinics" />
          <div className="footer-social">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.icon} href={social.href} aria-label={social.label}>
                <i className={social.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {LINK_COLUMNS.map((column) => (
            <div key={column.title} className="footer-column">
              <span className="footer-column-title">{column.title}</span>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-line" />
        <div className="footer-bottom-content">
          <span>© Nova Clinics 2025</span>
          <span>
            {/* Nova Clinics is the trading name of Novaclinicsuk Ltd, a company registered in England
            and Wales, registration number 16344901. */}
            Nova Clinics trades as the registered entity Novaclinicsuk Ltd, incorporated in England
            and Wales under company number 16344901.
          </span>
        </div>
      </div>
    </footer>
  );
}  
