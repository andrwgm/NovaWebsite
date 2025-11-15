import React from 'react';
import SupportGuides from '../components/SupportGuides';
import './support.css';

export default function Support() {
  return (
    <main className="support">
      <section className="support-hero">
        <h1 className="support-hero__title">UNDERSTANDING STARTS HERE</h1>
        <p className="support-hero__description">
          At Nova Clinic, we know that every family’s journey is unique. This space is designed to help you find trusted
          information, practical tools, and emotional support — all in one place. Explore the topics below to discover
          guides, activities, and useful links for understanding and supporting your child.
        </p>
      </section>

      <section className="support-highlight">
        <p className="support-highlight__statement">
          THROUGH EVERY STAGE, THROUGH EVERY DAY — NOVA’S HERE TO GUIDE THE WAY
        </p>
        <div className="support-highlight__image">
          <img src="/images/girl-book.png" alt="Person reading while resting on a sofa" />
        </div>
      </section>

      <SupportGuides />
    </main>
  );
}
