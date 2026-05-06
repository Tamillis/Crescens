<template>
    <div class="card">
        <div class="flex">
            <h3 class="m0">{{bg.name}}</h3>
            <div style="flex-grow:1"></div>
            <span class="skills">({{ bg.skills }})</span>
        </div>
        <p>{{ bg.desc }}</p>
        <hr/>
        <p class="italic small">{{ bg.equipment }}</p>
    </div>
</template>

<script setup>
const props = defineProps(["bg"]);
</script>

<style scoped>
.card {
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--accent-border);
    border-radius: 4px;
}

.skills {
    font-weight: 400;
    font-size: 0.66em;
    letter-spacing: 0.075em;
}
.flex {
    align-items: baseline;
}
</style>