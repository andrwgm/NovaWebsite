import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const SOCIAL_LINKS = [
  { icon: 'pi pi-instagram', label: 'Instagram', href: 'https://www.instagram.com/novaclinicsuk/' },
  { icon: 'pi pi-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/novaclinicsuk/' },
  { icon: 'pi pi-facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61584780458767' },
  // { icon: 'pi pi-youtube', label: 'YouTube', href: '#' },
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
      { label: 'People behind', to: '/about#people-behind' },
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
      { label: 'Meet the team', to: '/about' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Best practices', to: '/best-practices' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Privacy policy', to: '/privacy-policy' },
      { label: 'Cookies policy', to: '/cookies-policy' },
      { label: 'Terms and conditions', to: '/terms-and-conditions' },
      { label: 'Withdraw cookie consent', action: 'revoke-cookies' },
    ],
  },
];

export default function Footer() {
  const handleRevokeCookies = () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.dispatchEvent(new CustomEvent('nova-cookie-consent', { detail: null }));
  };

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
                    {link.action === 'revoke-cookies' ? (
                      <button type="button" className="footer-link-button" onClick={handleRevokeCookies}>
                        {link.label}
                      </button>
                    ) : link.to ? (
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
          <span>© Nova Clinics 2026</span>
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
