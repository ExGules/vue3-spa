<template>
  <div>
    <h1>Остатки</h1>
    <Filters
      :filters="filters"
      v-model="filterValues"
      @search="fetchData"
      @reset="resetFilters"
    />
    <DataChart
      v-if="chartData"
      type="bar"
      :data="chartData"
      :options="chartOptions"
      style="margin: 24px 0"
    />
    <DataTable :columns="columns" :data="items" />
    <Pagination
      :total="total"
      :page="page"
      :pageSize="pageSize"
      @update:page="onPageChange"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import api from '../api';
import DataTable from '../components/DataTable.vue';
import DataChart from '../components/DataChart.vue';
import Filters from '../components/Filters.vue';
import Pagination from '../components/Pagination.vue';

const columns = [
  { prop: 'date', label: 'Дата', width: 120 },
  { prop: 'stock', label: 'Остаток', width: 120 },
];

const filters = [
  { prop: 'dateFrom', label: 'С даты', type: 'date', props: { type: 'date' } },
  { prop: 'dateTo', label: 'По дату', type: 'date', props: { type: 'date' } },
  { prop: 'stock', label: 'Остаток', type: 'input', props: { type: 'number', placeholder: 'Минимум' } },
];

const filterValues = reactive({ dateFrom: '', dateTo: '', stock: '' });
const items = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
const chartData = ref(null);
const chartOptions = ref({ responsive: true, plugins: { legend: { display: false } } });

async function fetchData() {
  const params = {
    ...filterValues,
    page: page.value,
    limit: pageSize.value,
  };
  const { data } = await api.get('/stocks', { params });
  items.value = data.data || [];
  total.value = data.meta?.total || 0;
  buildChart();
}

function resetFilters() {
  filterValues.dateFrom = '';
  filterValues.dateTo = '';
  filterValues.stock = '';
  page.value = 1;
  fetchData();
}

function onPageChange(newPage) {
  page.value = newPage;
  fetchData();
}

function buildChart() {
  // Группируем остатки по датам для графика
  const grouped = {};
  for (const item of items.value) {
    const date = item.date;
    if (!grouped[date]) grouped[date] = 0;
    grouped[date] += Number(item.stock) || 0;
  }
  chartData.value = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: 'Остатки',
        data: Object.values(grouped),
        backgroundColor: '#F56C6C',
      },
    ],
  };
}

watch([() => filterValues.dateFrom, () => filterValues.dateTo, () => filterValues.stock], () => {
  page.value = 1;
});

fetchData();
</script> 