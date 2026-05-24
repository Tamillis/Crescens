import { createRouter, createWebHistory } from 'vue-router';

import MarkdownEditor from './pages/MarkdownEditor.vue';
import MagicPowers from './pages/MagicPowers.vue';
import CharacterCreator from './pages/CharacterCreator.vue';

// 1. Add ?raw to read files as strings. Use eager: true to keep your exact mapping strategy
const mdCoreDocuments = import.meta.glob('./docs/core/\*.md', { query: '?raw', eager: true });
const mdModuleDocuments = import.meta.glob('./docs/modules/\*.md', { query: '?raw', eager: true });

const mdRoutes = (key, docs) => Object.keys(docs).map((path) => {
  const name = path.split('/').pop().replace('.md', '')
  return {
    path: `/docs/${key}/${name}`,
    name: `doc-${key}-${name}`,
    component: MarkdownEditor,
    props: { 
      rawMarkdown: docs[path].default,
      docId: `${key}/${name}`
    },
    meta: { title: name.replaceAll("-", " "), group: key }
  }
});

const routes = [
  { path: '/', redirect: '/docs/core/core' },
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
  ...mdRoutes('core', mdCoreDocuments),
  ...mdRoutes('modules', mdModuleDocuments),
  { path: '/:pathMatch(.*)*', redirect: "/" }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
});