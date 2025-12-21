const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '');

export const JOB_OFFERS_ENDPOINT = `${API_BASE_URL}/api/v1/job-offers/`;

export { API_BASE_URL };
