<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const props = defineProps({
  type: String,
  data: Object,
  options: Object,
});

const canvasRef = ref();
let chartInstance = null;

onMounted(() => {
  chartInstance = new Chart(canvasRef.value, {
    type: props.type,
    data: props.data,
    options: props.options,
  });
});

watch(() => [props.data, props.options], ([data, options]) => {
  if (chartInstance) {
    chartInstance.data = data;
    chartInstance.options = options;
    chartInstance.update();
  }
});
</script> 