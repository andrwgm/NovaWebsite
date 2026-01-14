const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '');

export const JOB_OFFERS_ENDPOINT = `${API_BASE_URL}/api/v1/job-offers/`;
export const JOB_APPLICATIONS_ENDPOINT = `${API_BASE_URL}/api/v1/job-applications/`;
export const CONTACT_SUBMISSIONS_ENDPOINT = `${API_BASE_URL}/api/v1/contact-submissions/`;

export { API_BASE_URL };
