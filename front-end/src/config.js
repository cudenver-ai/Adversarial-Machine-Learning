export const API_BASE_URL = (() => {
    const base = import.meta.env.VITE_API_BASE_URL || '';
    if (window.location.protocol === 'https:' && base.startsWith('http://')) {
      return base.replace('http://', 'https://');
    }
    return base;
  })();
  