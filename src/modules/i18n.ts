import i18next from 'i18next'
import HttpApi from 'i18next-http-backend'

const urlBase = 'https://inquisitive-bienenstitch-a0a3dc.netlify.app/'

try {
  i18next.use(HttpApi).init({
    lng: 'es',
    ns: ['common'],
    defaultNS: 'common',
    compatibilityJSON: 'v4',
    debug: true,
    backend: {
      loadPath: `${urlBase}/i18n/{{lng}}/{{ns}}.json`,
    },
  })
} catch (e) {
  console.error(e)
}

export const i18n = i18next
