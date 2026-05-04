<template>
    <div>
        <h1>Character Creator</h1>

        <h2>Ancestry</h2>
        <p>Human (Skill Increase)</p>

        <h2>Statistics</h2>
        <p>Roll 7 6-sided dice and drop the highest and lowest roll. A result of 1-2 is d4, 3-4-5 is d6 and 6 is d8. These map in-order to Strength, Agility, Perception, Intelligence and Spirit</p>
        <p><small>If you end up with 3 d4's or 3 d8's (or more!) re-roll.</small></p>

        <button @click="useRoller = !useRoller" style="margin-bottom: 1rem;">{{ useRoller ? "Pick Manual Stats" : "Use Roller" }}</button>

        <StatRoller v-if="useRoller" />
        <div v-else>
            <p>Manual stat allocation TODO</p>
        </div>

        <h2>Skills</h2>

        <div class="flex">
            <select v-model="selectedSkill">
                <option disabled value="">Select a skill...</option>
                <option v-for="skill in core.skills">{{ skill }}</option>
            </select>
            <button @click="selectSkill">+</button>

            <div v-for="skill in selectedSkills">
                <p @click="removeSkill(skill)">{{ skill }}</p>
            </div>
        </div>

        
    </div>
</template>

<script setup>
import { ref } from 'vue';
import StatRoller from '../components/StatRoller.vue';
import core from '../assets/core.json';

const useRoller = ref(true);
const selectedSkills = ref([]);
const selectedSkill = defineModel('selectedSkill');

function selectSkill() {
    if(!selectedSkills.value.includes(selectedSkill.value)) selectedSkills.value.push(selectedSkill.value);
}

function removeSkill(skill) {
    selectedSkills.value = selectedSkills.value.filter(ss => ss != skill);
}
</script>

<style scoped>

</style>