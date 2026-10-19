/** Remote brochure PDF. Served to visitors only through /api/brochure/file. */
export const BROCHURE_REMOTE_URL =
  'https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/Fencecraft%20Brochure.pdf'

export const BROCHURE_FILE_NAME = 'FENCECRAFT-Brochure.pdf'

export const countryCodes = [
  { code: '+91', label: 'IN +91' },
  { code: '+971', label: 'AE +971' },
  { code: '+966', label: 'SA +966' },
  { code: '+977', label: 'NP +977' },
  { code: '+880', label: 'BD +880' },
  { code: '+94', label: 'LK +94' },
  { code: '+65', label: 'SG +65' },
  { code: '+44', label: 'GB +44' },
  { code: '+1', label: 'US +1' },
  { code: '+61', label: 'AU +61' },
  { code: '+64', label: 'NZ +64' },
  { code: '+86', label: 'CN +86' },
] as const
