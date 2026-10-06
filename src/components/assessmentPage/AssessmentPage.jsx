import React from 'react';
import BlogSeo from '../blog/BlogSeo';
import BlogJsonLd from '../blog/BlogJsonLd';
import AssessmentHero from './AssessmentHero';
import AssessmentSectionNav from './AssessmentSectionNav';
import AssessmentIncluded from './AssessmentIncluded';
import AssessmentHowItWorks from './AssessmentHowItWorks';
import AssessmentSupportBox from './AssessmentSupportBox';
import AssessmentFaqs from './AssessmentFaqs';
import AssessmentFinalCta from './AssessmentFinalCta';
import { buildAssessmentPageJsonLd } from '../../data/assessmentPages/shared';
import './assessmentPage.css';

/**
 * Shared layout of the three service pages (ADHD, autism, combined). Everything that differs
 * between them comes from the `content` object in src/data/assessmentPages/.
 */
export default function AssessmentPage({ content }) {
  return (
    // App already wraps routes in <main>, so this is a plain container.
    <div className="asmt-page">
      <BlogSeo
        title={content.seo.title}
        description={content.seo.description}
        canonicalUrl={content.url}
        ogImage={content.seo.heroImage}
        ogType="website"
      />
      <BlogJsonLd schema={buildAssessmentPageJsonLd(content)} />

      <AssessmentHero content={content} />
      <AssessmentSectionNav content={content} />
      <AssessmentIncluded content={content} />
      <AssessmentHowItWorks content={content} />
      <AssessmentSupportBox content={content} />
      <AssessmentFaqs content={content} />
      <AssessmentFinalCta content={content} />
    </div>
  );
}
