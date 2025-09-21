const externalPattern = /^(https?:)?\/\//i;

export const resolveAssetUrl = (value) => {
  if (!value) {
    return '';
  }

  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (externalPattern.test(trimmed) || trimmed.startsWith('data:')) {
    return trimmed;
  }

  const sanitized = trimmed.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${sanitized}`;
};
