import React from 'react';
import AssessmentPage from '../components/assessmentPage/AssessmentPage';
import { COMBINED_PAGE } from '../data/assessmentPages/combined';

export default function AutismAdhdAssessment() {
  return <AssessmentPage content={COMBINED_PAGE} />;
}
