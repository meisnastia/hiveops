import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

function normalizeDetectedLanguage(lng) {
  if (lng == null || typeof lng !== 'string') return 'en';
  const base = lng.trim().split(/[-_]/)[0].toLowerCase();
  if (base === 'uk' || base === 'ua') return 'ua';
  if (base === 'en') return 'en';
  return 'en';
}

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    supportedLngs: ['en', 'ua'],
    detection: {
      order: ['localStorage', 'navigator', 'queryString'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
      convertDetectedLanguage: normalizeDetectedLanguage,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
