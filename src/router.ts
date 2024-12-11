import { createMemoryHistory, createRouter } from 'vue-router'
import HomePlugin from './views/HomePlugin.vue'

const routes = [
  { path: '/', name: 'home', component: HomePlugin },
  { path: '/texts', name: 'texts', component: () => import('./views/TextsOptions.vue') },
  { path: '/image', name: 'image', component: () => import('./views/ImageOptions.vue') },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
