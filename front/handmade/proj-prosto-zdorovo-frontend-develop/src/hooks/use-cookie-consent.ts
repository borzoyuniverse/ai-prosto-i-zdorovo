import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';

const consentKey = 'cookiesAccepted';
const domain =
  globalThis.location.hostname === 'localhost'
    ? ''
    : import.meta.env.VITE_COOKIE_DOMAIN_VALUE;

export const useCookieConsent = () => {
  const [hasConsent, setHasConsent] = useState(() => Cookies.get(consentKey) === 'true');

  useEffect(() => {
    const checkConsent = () => setHasConsent(Cookies.get(consentKey) === 'true');
    globalThis.addEventListener('storage', checkConsent);
    return () => globalThis.removeEventListener('storage', checkConsent);
  }, []);

  const setConsent = () => {
    Cookies.set(consentKey, 'true', {
      domain: domain,
      expires: 365,
      path: '/',
      sameSite: 'Lax',
      secure: true,
    });
    setHasConsent(true);
  };

  const resetConsent = () => {
    Cookies.remove(consentKey, {
      domain: domain,
      path: '/',
    });
    setHasConsent(false);
  };

  return { hasConsent, setConsent, resetConsent };
};
