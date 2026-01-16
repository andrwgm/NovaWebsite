const isDevEnv =
  (import.meta.env.VITE_ENV || import.meta.env.MODE) === 'dev' ||
  import.meta.env.MODE === 'development';
const rawBaseUrl = isDevEnv
  ? import.meta.env.VITE_API_BASE_URL
  : 'https://api.novaclinics.co.uk';
const API_BASE_URL = (rawBaseUrl || '').replace(/\/$/, '');

export const JOB_OFFERS_ENDPOINT = `${API_BASE_URL}/api/v1/job-offers/`;
export const JOB_APPLICATIONS_ENDPOINT = `${API_BASE_URL}/api/v1/job-applications/`;
export const CONTACT_SUBMISSIONS_ENDPOINT = `${API_BASE_URL}/api/v1/contact-submissions/`;

export { API_BASE_URL };
