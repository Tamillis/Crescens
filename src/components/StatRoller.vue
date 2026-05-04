<template>
    <div class="roller-container">
        <button @click="rollResults" class="roll-result">Roll</button>
        <p class="colon">:</p>

        <div v-for="result in results" class="roll-result">
            <p :class="{red: !result.kept}">{{ result.stat }}</p>
            <p :class="{red: !result.kept}">{{ result.value }}</p>
            <p :class="{red: !result.kept}" style="font-size: 1rem">{{ result.statValue }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import core from '../assets/core.json';

let diceRoll = () => Math.floor(Math.random() * 6) + 1;
const rollValueMap = ["d4", "d4", "d6", "d6", "d6", "d8"];

const results = ref([]);
rollResults();


function rollResults() {
    results.value = [];
    let min = 6, minN = 0;
    let max = 1, maxN = 0;
    for (let n = 0; n < core.stats.length + 2; n++) {
        results.value.push({
            value: diceRoll(),
            stat: "",
            statValue: "",
            kept: true
        });

        if (results.value[n].value <= min) {
            minN = n;
            min = results.value[n].value;
        }
        if (results.value[n].value >= max) {
            maxN = n;
            max = results.value[n].value;
        }
    }

    results.value[minN].kept = false;
    results.value[maxN].kept = false;

    let i = 0;
    for(let result of results.value) {
        result.statValue = rollValueMap[result.value - 1];
        if(result.kept) result.stat = core.stats[i++];
        else result.stat = "Ignored";
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
}

.roll-result p {
    margin: 0;
    width: fit-content;
    font-size: 0.8em;
}

.red {
    color: red;
}

.colon {
    font-size: 4rem; 
    margin: 0;
    height: 2.5rem;
}
</style>