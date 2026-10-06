import React from 'react';
import AssessmentPage from '../components/assessmentPage/AssessmentPage';
import { AUTISM_PAGE } from '../data/assessmentPages/autism';

export default function AutismAssessment() {
  return <AssessmentPage content={AUTISM_PAGE} />;
}
