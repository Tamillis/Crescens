<template>
    <div>
        <h3>Manual Stat Allocation</h3>
        <p>You have a d4, 3d6's and a d8 to allocate</p>

        <div class="stat-selector-container">
            <div v-for="stat in core.stats">
                <label :for="'stat-selector-' + stat" class="capitalise">{{ stat }}</label>
                <select :id="'stat-selector-' + stat" :value="data[stat]" @change="e => data[stat] = e.target.value">
                    <option>d4</option>
                    <option>d6</option>
                    <option>d8</option>
                </select>
            </div>
        </div>

        <p style="color:red" v-show="statSelectionErr != ''">{{ statSelectionErr }}</p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import core from '../assets/core.json';

const data = ref({
    strength: "d8",
    agility: "d6",
    perception: "d6",
    intelligence: "d6",
    spirit: "d4"
});

watch(() => data.value.strength, checkManualStatValidity);
watch(() => data.value.agility, checkManualStatValidity);
watch(() => data.value.perception, checkManualStatValidity);
watch(() => data.value.intelligence, checkManualStatValidity);
watch(() => data.value.spirit, checkManualStatValidity);

const statSelectionErr = ref("");

function checkManualStatValidity() {
    let vals = Object.values(data.value);
    if(vals.filter(v => v == "d4").length != 1 || vals.filter(v => v == "d6").length != 3 || vals.filter(v => v == "d8").length != 1) {
        statSelectionErr.value = "Please select 1d4, 3d6 and 1d8";
    }
    else statSelectionErr.value = "";
}

</script>

<style scoped>
.stat-selector-container {
    display: flex;
    gap: 0.5rem;
}
</style>