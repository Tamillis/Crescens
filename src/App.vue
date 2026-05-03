<script setup>
import { ref, watch, computed, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const headers = ref([])
const contentArea = ref(null)

// Get all routes for the navbar
const navigation = computed(() => {
  return router.getRoutes().filter(r => r.path !== '/' && r.name !== 'not-found')
})

const updateToc = async () => {
  await nextTick()
  if (!contentArea.value) return

  const elements = contentArea.value.querySelectorAll('h2, h3')
  headers.value = Array.from(elements).map(el => ({
    text: el.innerText,
    id: el.id || el.innerText.toLowerCase().replace(/\s+/g, '-'),
    level: el.tagName
  }))
}

// Watch for route changes to refresh the ToC
watch(() => route.path, updateToc);
onMounted(updateToc);

const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    history.pushState(null, null, `#${id}`);
  }
};
</script>

<template>
  <div class="layout">

    <h1 class="icon">Crescens</h1>

    <nav>
      <router-link v-for="navItem in navigation" :key="navItem.path" :to="navItem.path" class="nav-link">
        {{ navItem.meta?.title || navItem.name }}
      </router-link>
    </nav>

    <aside class="toc">
      <div v-if="headers.length > 0">
        <h4 style="margin-bottom: 0">Headers</h4>
        <ul>
          <li v-for="h in headers" :key="h.id" :class="h.level">
            <a :href="'#' + h.id" @click.prevent="scrollToId(h.id)">{{ h.text }}</a>
          </li>
        </ul>
      </div>
    </aside>

    <main ref="contentArea" class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
.icon {
  color: var(--accent);
  width: fit-content;
  padding: 0 1rem;
  font-family: var(--mono);
}

.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
}

.toc {
  padding: 1rem;
  background: var(--shadow);
}

.toc li {
  list-style: ">";
}

.toc a {
  color: var(--accent);
  text-decoration: none;
}

.content {
  padding: 2rem;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
}

.active-link {
  font-weight: bold;
  color: #42b883;
}

.H2 {
  margin-left: 0.5rem;
  font-size: 1em;
}

.H3 {
  margin-left: 1rem;
  font-size: 0.9em;
}

.H4 {
  margin-left: 1.5rem;
  font-size: 0.75em;
}
</style>