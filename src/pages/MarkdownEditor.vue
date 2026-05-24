<template>
    <div class="md-editor-container">
        <!-- Toolbar with toggle and save button -->
        <div class="toolbar">
            <button @click="isEditing = !isEditing">
                {{ isEditing ? 'Switch to View Mode' : 'Edit Document' }}
            </button>
            <button v-if="isEditing" @click="saveChanges" class="save-btn">
                Save Changes
            </button>
        </div>

        <div v-if="!isEditing" class="markdown-body" v-html="renderedMarkdown"></div>
        <div v-else class="edit-body">
            <textarea v-model="currentContent" class="markdown-textarea"></textarea>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'

const props = defineProps({
  rawMarkdown: { type: String, required: true },
  docId: { type: String, required: true }
});

const isEditing = ref(false);
const currentContent = ref(props.rawMarkdown);

watch(() => props.rawMarkdown, (newVal) => {
  currentContent.value = newVal
});

const md = new MarkdownIt().use(anchor);
const renderedMarkdown = computed(() => md.render(currentContent.value));

const saveChanges = async () => {
  try {
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        docId: props.docId,
        content: currentContent.value
      })
    })
    
    if (response.ok) {
      console.log('File saved successfully!')
      isEditing.value = false
    } else {
      alert('Failed to save file.')
    }
  } catch (error) {
    console.error('Error saving markdown:', error)
  }
};
</script>

<style scoped>
.md-editor-container {
    padding: 20px;
    position: relative;
}

.toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: flex-end;
}

.save-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
}

.markdown-textarea {
    width: 100%;
    min-height: 75vh;
    width: 100%;
    font-family: monospace;
    font-size: 16px;
    padding: 15px;
    box-sizing: border-box;
}
</style>