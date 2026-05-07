<template>
    <div>
        <p>Roll 5 6-sided dice, assigning them in-order to Strength, Agility, Perception, Intelligence and Spirit.</p>
        <p>A result of 1-2 is d4, 3-4 is d6 and 5-6 is d8.</p>
        <p><small>If you end up with 3 d4's or 3 d8's (or more!) you should re-roll. Click to swap stats.</small></p>
        <div class="roller-container">
            <button @click="rollResults" class="roll-result">Roll</button>
            <p class="colon">:</p>
    
            <div v-for="result in results" class="roll-result" @click="swap(result.stat)" :class="{green: result.stat == swapSelected}">
                <p :class="{red: !result.kept}" class="capitalise">{{ result.stat }}</p>
                <p :class="{red: !result.kept}">{{ result.value }}</p>
                <p :class="{red: !result.kept}" style="font-size: 1rem">{{ result.statValue }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import core from '../assets/core.json';

const model = defineModel({type: Object, required: true});

let diceRoll = () => Math.floor(Math.random() * 6) + 1;
const rollValueMap = ["d4", "d4", "d6", "d6", "d8", "d8"];

const results = ref([]);
const swapSelected = ref("");

function swap(stat) {
    if(swapSelected.value) {
        let selectedResult = results.value.filter(result => result.stat == swapSelected.value)[0];
        let clickedResult = results.value.filter(result => result.stat == stat)[0];
        let tempValue = selectedResult.value;
        let tempStatValue = selectedResult.statValue;

        selectedResult.value = clickedResult.value;
        selectedResult.statValue = clickedResult.statValue;
        model.value[selectedResult.stat] = selectedResult.statValue;
        clickedResult.value = tempValue;
        clickedResult.statValue = tempStatValue;
        model.value[clickedResult.stat] = clickedResult.statValue;


        swapSelected.value = "";
    }
    else {
        swapSelected.value = stat;
    }
}

rollResults();
function rollResults() {
    results.value = [];
    for (let stat of core.stats) {
        let roll = diceRoll();
        model.value[stat] = rollValueMap[roll - 1];
        results.value.push({
            value: roll,
            stat: stat,
            statValue: rollValueMap[roll - 1],
            kept: true
        });
    }
}

</script>

<style scoped>
.roller-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.roll-result {
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid var(--accent);
    cursor: pointer;
}

.roll-result p {
    margin: 0;
    width: fit-content;
    font-size: 0.8em;
}

.red {
    color: red;
}

.green {
    border-color: green;
}

.colon {
    font-size: 4rem; 
    margin: 0;
    height: 2.5rem;
}
</style>