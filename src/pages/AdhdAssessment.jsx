import React from 'react';
import AssessmentPage from '../components/assessmentPage/AssessmentPage';
import { ADHD_PAGE } from '../data/assessmentPages/adhd';

export default function AdhdAssessment() {
  return <AssessmentPage content={ADHD_PAGE} />;
}
