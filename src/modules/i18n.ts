import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'

try {
  i18next.use(HttpApi).init({
    lng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    compatibilityJSON: 'v4',
    debug: true,
    backend: {
      loadPath: 'http://localhost:4403/i18n/{{lng}}/{{ns}}.json',
    },
  })
} catch (e) {
  console.error(e)
}

export const i18n = i18next
