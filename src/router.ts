import { createMemoryHistory, createRouter } from 'vue-router'
import HomePlugin from './views/HomePlugin.vue'

const routes = [
  { path: '/', name: 'home', component: HomePlugin },
  { path: '/texts', name: 'texts', component: () => import('./views/TextsOptions.vue') },
  { path: '/image', name: 'image', component: () => import('./views/ImageOptions.vue') },
  { path: '/text/fullName', name: 'fullName', component: () => import('@/features/text/fullname/FullNameView.vue') },
  {
    path: '/image/coverPhoto',
    name: 'coverPhoto',
    component: () => import('@/features/image/coverPhoto/CoverPhotoView.vue'),
  },
  {
    path: '/image/profilePhoto',
    name: 'profilePhoto',
    component: () => import('@/features/image/profilePhoto/ProfilePhotoView.vue'),
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
