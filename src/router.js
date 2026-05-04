import { createRouter, createWebHistory } from 'vue-router'
import MagicPowers from './pages/MagicPowers.vue'
import CharacterCreator from './pages/CharacterCreator.vue';

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
    path: '/magic-powers', 
    name: 'magic-powers', 
    component: MagicPowers,
    meta: { title: 'Magic Powers' } 
  },
  { 
    path: '/character-creator', 
    name: 'character-creator', 
    component: CharacterCreator,
    meta: { title: 'Character Creator' } 
  },
  ...mdRoutes
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})