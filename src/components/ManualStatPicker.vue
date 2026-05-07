<template>
    <div>
        <h3>Manual Stat Allocation</h3>
        <p>You have a d4, 3d6's and a d8 to allocate</p>

        <div class="stat-selector-container">
            <div v-for="(stat, key) in model">
                <label :for="'stat-selector-' + key" class="capitalise">{{ key }}</label>
                <select :id="'stat-selector-' + key" v-model="model[key]">
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

const model = defineModel({type: Object, required: true})

watch(model, checkManualStatValidity, { deep: true });

const statSelectionErr = ref("");
checkManualStatValidity();

function checkManualStatValidity() {
    let vals = Object.values(model.value);
    if (vals.filter(v => v == "d4").length != 1 || vals.filter(v => v == "d6").length != 3 || vals.filter(v => v == "d8").length != 1) {
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