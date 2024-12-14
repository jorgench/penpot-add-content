import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'

import I18NextVue from 'i18next-vue'
import { i18n } from './modules/i18n'

createApp(App).use(router).use(I18NextVue, { i18next: i18n }).mount('#app')
