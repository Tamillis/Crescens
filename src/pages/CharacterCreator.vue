<template>
    <div>
        <h1>Character Creator</h1>

        <h2>Info</h2>
        <label>Name: </label>
        <input :value="name" />

        <h2>Ancestry</h2>
        <p>Human (Skill Increase)</p>

        <h2>Statistics</h2>

        <button @click="useRoller = !useRoller">{{ useRoller ? "Pick Manual Stats" : "Use Roller" }}</button>

        <StatRoller v-show="useRoller" v-model="selectedStats" style="margin-top:1rem;" />
        <ManualStatPicker v-show="!useRoller" v-model="selectedStats"/>

        <h3>Derived Statistics</h3>

        <div class="flex">
            <p>
                <strong>Limit: </strong> 
                Strength {{ selectedStats.strength }} + Spirit {{ selectedStats.spirit }} = 
                <strong>{{ statMax(selectedStats.strength) + statMax(selectedStats.spirit) }}</strong>
            </p>
            <p> | </p>
            <p>
                <strong>Evasion: </strong> 
                Agility {{ selectedStats.agility }} / 2 = 
                <strong>{{ statAvg(selectedStats.agility ) }}</strong>
            </p>
        </div>

        <h2>Background</h2>
        <p v-if="selectedBg === ''">Select one.</p>
        <div class="bg-container">
            <BackgroundCard v-for="bg in selectableBgs" :bg="bg" @click="selectBg(bg.name)" class="card" />
        </div>


        <h2>Skills</h2>

        <p>Choose 8 ranks of skills (<small>{{ ranksLeft }} left</small>), where no skill can be higher than rank 3.</p>

        <div class="skills-container">
            <div v-for="skill in selectableSkills" class="skill-container">
                <button class="square" @click="decrementSkill(skill.name)">-</button>
                <p class="m0 skill-name">{{ skill.name }}</p>
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
const selectedStats = ref({
    strength: "d8",
    agility: "d6",
    perception: "d6",
    intelligence: "d6",
    spirit: "d4"
});

const selectableBgs = ref(core.backgrounds);
const selectedBg = ref("");
const name = ref("")

const selectableSkills = ref(core.skills.map(s => { return { name: s, rank: 0 } }))
const ranksLeft = ref(8);

function statAvg(statValue) {
    let val = statMax(statValue);
    return Math.floor(val / 2);
}

function statMax(statValue) {
    return Number(statValue.slice(1))
}

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
    grid-template-columns: repeat(auto-fill, minmax(245px, 1fr));
    gap: 0;
}

@media (min-width: 1500px) {
    .bg-container {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

.skill-container {
    display: flex;
    width: 100%;
    gap: 0.5rem;
    border-right: 1px solid var(--accent-border);
    padding: 0.5rem;
}

.skill-selector:last-child {
    border-right: none;
}

.skill-name {
    font-size: 0.85em;
}

.card {
    cursor: pointer;
}

.card:hover {
    border-color: green;
}


</style>
