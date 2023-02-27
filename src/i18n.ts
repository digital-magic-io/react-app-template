import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ChainedBackend from 'i18next-chained-backend'
import HttpApiBackend from 'i18next-http-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import { LanguageConfiguration } from '@constants/configuration'

declare module 'i18next' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    returnNull: false
  }
}

void i18n
  // Try to translation from localStore (https://github.com/i18next/i18next-localstorage-backend) using ChainedBackend (https://github.com/i18next/i18next-chained-backend)
  // or load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(ChainedBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next to be able to use via hooks.
  .use(initReactI18next)
  .init(
    {
      debug: process.env.NODE_ENV !== 'production',
      fallbackLng: LanguageConfiguration.defaultLanguage,
      ns: [LanguageConfiguration.translationNamespace],
      defaultNS: LanguageConfiguration.translationNamespace,
      keySeparator: '.',
      supportedLngs: LanguageConfiguration.availableLanguages,
      interpolation: {
        escapeValue: false // react already safes from xss
      },
      // ChainedBackend configuration
      backend: {
        backends: [LocalStorageBackend, HttpApiBackend],
        backendOptions: [
          // LocalStorageBackend options
          {
            prefix: LanguageConfiguration.cacheStorageKeyPrefix,
            expirationTime: LanguageConfiguration.cacheExpirationMs,
            defaultVersion: LanguageConfiguration.version,
            store: localStorage
          },
          // HttpApiBackend options
          {
            loadPath: LanguageConfiguration.loadPath
          }
        ]
      },
      // Configuration for language detector (https://github.com/i18next/i18next-browser-languageDetector#detector-options)
      detection: {
        order: ['querystring', 'localStorage' /*, 'navigator', 'htmlTag'*/],
        lookupQuerystring: 'lng',
        lookupLocalStorage: LanguageConfiguration.storageKey,
        caches: ['localStorage']
        //checkWhitelist: true
      },
      react: {
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
      }
    },
    (err) => {
      if (err) {
        console.error('Unable to fully initialize i18next', err)
      }
    }
  )

/*
// TODO: Uncomment to update language resources for example for time/calendar textual resources
i18n.on('languageChanged', (lng) => {
  Settings.defaultLocale = lng
})
*/

export { i18n }
