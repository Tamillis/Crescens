<script setup>
import { shallowRef, onMounted } from 'vue'

const modules = import.meta.glob('/src/docs/\*.md', { eager: true });
console.log(modules);
const docs = Object.keys(modules).map((path) => {
  const name = path.split('/').pop().replace('.md', '')
  return {
    name,
    component: modules[path].default
  }
});

// State for the currently viewed doc
const currentDoc = shallowRef(docs[0]?.component);
</script>

<template>
  <div class="wiki-layout">
    <!-- Sidebar Navigation -->
    <nav>
      <ul>
        <li v-for="doc in docs" :key="doc.name">
          <a @click="currentDoc = doc.component">
            {{ doc.name }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Content Viewer -->
    <main id="main">
      <component :is="currentDoc" v-if="currentDoc" />
    </main>
  </div>
</template>