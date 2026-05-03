import { createRouter, createWebHistory } from 'vue-router'
import MagicPowers from './pages/MagicPowers.vue'

const mdModules = import.meta.glob('./docs/\*.md', { eager: true })

const mdRoutes = Object.keys(mdModules).map((path) => {
  const name = path.split('/').pop().replace('.md', '')
  return {
    path: `/docs/${name}`,
    name: `doc-${name}`,
    component: mdModules[path].default,
    meta: { title: name.charAt(0).toUpperCase() + name.slice(1) }
  }
});


const routes = [
  { path: '/', redirect: '/docs/core' },
  { 
    path: '/powers', 
    name: 'powers', 
    component: MagicPowers,
    meta: { title: 'Magic Powers' } 
  },
  ...mdRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})