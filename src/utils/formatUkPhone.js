/** Formats a UK mobile as "+44 7700 900123" while typing. Leading 0, 44 and 0044 are accepted. */
export function formatUkPhone(raw) {
  let digits = String(raw ?? '').replace(/\D/g, '');

  if (digits.startsWith('0044')) {
    digits = digits.slice(4);
  } else if (digits.startsWith('44')) {
    digits = digits.slice(2);
  }

  if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 10);
  if (!digits) return '';

  const first = digits.slice(0, 4);
  const rest = digits.slice(4);
  return rest ? `+44 ${first} ${rest}` : `+44 ${first}`;
}
