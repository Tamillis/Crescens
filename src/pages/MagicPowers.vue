<template>
    <h1>Module: Magic</h1>

    <h2 class="m0" id="powers">Powers</h2>

    <p>The Powers of Magic made available with the Magic Module.</p>

    <div class="powers-grid">
        <article v-for="power in magicPowers" :key="power.name" class="power-card">
            <div class="power-header">
                <h3 :id="power.name.toLowerCase().replace(/\s+/g, '-')">{{ power.name }}</h3>
                <span class="stat-tag">{{ power.stat }}</span>
            </div>

            <div class="power-meta">
                <strong>Skill:</strong> {{ power.skill }}
            </div>

            <p class="power-description">
                {{ power.description }}
            </p>

            <div class="power-section">
                <h4>Domain</h4>
                <p class="italic">{{ power.domain }}</p>
            </div>

            <div class="power-section">
                <h4>Manifestations</h4>
                <p>{{ power.examples }}</p>
            </div>
        </article>
    </div>
</template>

<script setup>
import magicPowers from '../assets/magic-powers.json';
import magicPowersText from '../docs/magic.md';
import { ref, computed, onMounted } from 'vue';

</script>

<style lang="css" scoped>
.powers-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.power-card {
    background: white;
    border: 1px solid #ddd;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.05);
}

.power-card p {
    margin: 0;
}

.power-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.power-header h3 {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1.4rem;
    scroll-margin-top: 2rem;
}

.stat-tag {
    background: var(--cool-dark);
    color: white;
    padding: 0.2rem 0.6rem;
    font-size: 0.8rem;
    font-weight: bold;
    border-radius: 4px;
}

.power-meta {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: #666;
}

.power-description {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
}

.power-section h3 {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 0.3rem;
}

.power-section p {
    font-size: 0.9rem;
    margin-top: 0;
}

.italic {
    font-style: italic;
}
</style>