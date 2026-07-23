export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  // If it's already an external URL, return as is
  if (/^(https?:|data:)/i.test(path)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Dynamically resolve base path based on hostname
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    return `/rohith-portfolio/${cleanPath}`;
  }

  return `/${cleanPath}`;
};
