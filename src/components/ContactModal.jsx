import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';

import { onContactModalRequest } from '../utils/contactModalService';
import './contactModal.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function ContactModal() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    const unsubscribe = onContactModalRequest(() => setVisible(true));
    return unsubscribe;
  }, []);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const close = () => {
    setVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Contact form submission', formData);
    setFormData(INITIAL_FORM);
    close();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="contact-modal-overlay" onClick={close}>
      <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="contact-modal-close"
          aria-label="Close contact form"
          onClick={close}
        >
          <i className="pi pi-times" />
        </button>
        <h2 className="contact-modal-title">Get in contact</h2>
        <form className="contact-modal-form" onSubmit={handleSubmit}>
          <IconField iconPosition="left" className="contact-field">
            <InputIcon className="pi pi-user" />
            <span className="p-float-label">
              <InputText
                id="contact-name"
                value={formData.name}
                onChange={handleChange('name')}
                required
              />
              <label htmlFor="contact-name">Full name</label>
            </span>
          </IconField>
          <IconField iconPosition="left" className="contact-field">
            <InputIcon className="pi pi-envelope" />
            <span className="p-float-label">
              <InputText
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                required
              />
              <label htmlFor="contact-email">Email address</label>
            </span>
          </IconField>
          <IconField iconPosition="left" className="contact-field">
            <InputIcon className="pi pi-phone" />
            <span className="p-float-label">
              <InputMask
                id="contact-phone"
                mask="+44 9999 999999"
                value={formData.phone}
                onChange={handleChange('phone')}
                placeholder="+44 ____ ______"
              />
              <label htmlFor="contact-phone">Phone (UK)</label>
            </span>
          </IconField>
          <IconField iconPosition="left" className="contact-field textarea-field">
            <InputIcon className="pi pi-comment" />
            <span className="p-float-label">
              <InputTextarea
                id="contact-message"
                rows={4}
                value={formData.message}
                onChange={handleChange('message')}
              />
              <label htmlFor="contact-message">How can we help?</label>
            </span>
          </IconField>

          <Button
            type="submit"
            label="Submit"
            icon="pi pi-send"
            iconPos="right"
            className="contact-modal-submit"
          />
        </form>
      </div>
    </div>
  );
}
