/** Record one free-resource download. No cookie, no identity, fail closed. */

import { API_BASE_URL } from './api';

const CAMPAIGN_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RESOURCE_ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_CAMPAIGN_LENGTH = 40;

let storedCampaign = '';

function shouldSkipPing() {
  if (typeof window === 'undefined') {
    return true;
  }
  if (document.documentElement?.dataset?.prerender === 'true') {
    return true;
  }
  return false;
}

function readCampaignParam() {
  if (typeof window === 'undefined') return '';
  try {
    const value = new URL(window.location.href).searchParams.get('campaign') ?? '';
    if (value.length > MAX_CAMPAIGN_LENGTH || !CAMPAIGN_RE.test(value)) return '';
    return value;
  } catch {
    return '';
  }
}

function campaignForPing() {
  if (storedCampaign) return storedCampaign;
  const value = readCampaignParam();
  if (value) storedCampaign = value;
  return storedCampaign;
}

function isIpHostname(hostname) {
  const host = String(hostname || '').replace(/^\[|\]$/g, '');
  if (!host || host.includes(':')) return true;
  const parts = host.split('.');
  if (parts.length !== 4) return false;
  return parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}

function referrerHost() {
  if (typeof document === 'undefined') return '';
  const raw = document.referrer;
  if (!raw) return '';
  try {
    const hostname = new URL(raw).hostname;
    if (!hostname || isIpHostname(hostname)) return '';
    return hostname;
  } catch {
    return '';
  }
}

if (!shouldSkipPing()) {
  campaignForPing();
}

export function recordResourceDownload(id) {
  const value = String(id || '').trim();
  if (shouldSkipPing() || !RESOURCE_ID_RE.test(value)) {
    return;
  }

  const body = {};
  const campaign = campaignForPing();
  const host = referrerHost();
  if (campaign) body.campaign = campaign;
  if (host) body.referrerHost = host;

  const url = `${API_BASE_URL}/api/v1/resources/${encodeURIComponent(value)}/downloads`;
  try {
    fetch(url, {
      method: 'POST',
      keepalive: true,
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => {});
  } catch {
    // Counts are best-effort. Never block the download.
  }
}
