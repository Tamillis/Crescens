<template>
    <div>
        <h1>Character Creator</h1>

        <h2>Ancestry</h2>
        <p>Human (Skill Increase)</p>

        <h2>Statistics</h2>

        <button @click="useRoller = !useRoller">{{ useRoller ? "Pick Manual Stats" : "Use Roller" }}</button>

        <StatRoller v-if="useRoller" style="margin-top:1rem;" />
        <ManualStatPicker v-else />

        <h3>Derived Statistics</h3>

        <p><strong>Limit: </strong> {{ "TODO: extract stat max from whichever stat gen is used" }}</p>
        <p><strong>Evasion: </strong> {{ "TODO: extract stat max from whichever stat gen is used" }}</p>

        <h2>Background</h2>
        <p>Select one.</p>
        <div class="bg-container">
            <BackgroundCard v-for="bg in selectableBgs" :bg="bg" @click="selectBg(bg.name)" class="card" />
        </div>


        <h2>Skills</h2>

        <p>Choose 8 ranks of skills, where no skill can be higher than rank 3.</p>
        <p><small>Ranks left: {{ ranksLeft }}</small></p>

        <div class="skills-container">
            <div v-for="skill in selectableSkills" class="skill-container">
                <button class="square" @click="decrementSkill(skill.name)">-</button>
                <p class="m0 skill-name small">{{ skill.name }}</p>
                <div style="flex-grow: 1;"></div>
                <span>({{ skill.rank }})</span>
                <button class="square" @click="incrementSkill(skill.name)">+</button>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import StatRoller from '../components/StatRoller.vue';
import core from '../assets/core.json';
import ManualStatPicker from '../components/ManualStatPicker.vue';
import BackgroundCard from '../components/BackgroundCard.vue';

const useRoller = ref(true);

const selectableBgs = ref(core.backgrounds);
const selectedBg = ref("");

const selectableSkills = ref(core.skills.map(s => { return { name: s, rank: 0 } }))
const ranksLeft = ref(8);

function selectBg(clickedBg) {
    if (selectedBg.value != "") {
        selectableBgs.value = core.backgrounds;
        selectedBg.value = "";
    }
    else {
        selectableBgs.value = selectableBgs.value.filter(bg => bg.name == clickedBg);
        selectedBg.value = clickedBg;
    }
}

function incrementSkill(skill) {
    const clickedSkill = selectableSkills.value.filter(s => s.name == skill)[0];
    if(ranksLeft.value == 0 || clickedSkill.rank == 3) return;
    clickedSkill.rank++;
    ranksLeft.value--;
}

function decrementSkill(skill) {
    const clickedSkill = selectableSkills.value.filter(s => s.name == skill)[0];
    if(ranksLeft.value == 8 || clickedSkill.rank == 0) return;
    clickedSkill.rank--;
    ranksLeft.value++;
}
</script>

<style scoped>
.skill-selector {
    border-radius: 4px;
    border: 1px solid var(--accent-border);
}

.flex {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
    width: fit-content;
}

.square {
    aspect-ratio: 1/1;
    min-width: 1.5em;
}

.bg-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.skills-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
}

@media (min-width: 1500px) {
    .bg-container {
        grid-template-columns: 1fr 1fr 1fr;
    }

    .skills-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
    }
}

.skill-container {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    border-right: 1px solid var(--accent-border);
    padding-right: 0.5rem;
}

.skill-selector:last-child {
    border-right: none;
}

.card {
    cursor: pointer;
}

.card:hover {
    border-color: green;
}

.skill-name {
    padding-left: 0.25em;
}
</style>
