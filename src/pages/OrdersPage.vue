<template>
  <div>
    <h1>Заказы</h1>
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
  { prop: 'status', label: 'Статус', width: 120 },
  { prop: 'sum', label: 'Сумма', width: 120 },
];

const filters = [
  { prop: 'dateFrom', label: 'С даты', type: 'date', props: { type: 'date' } },
  { prop: 'dateTo', label: 'По дату', type: 'date', props: { type: 'date' } },
  { prop: 'status', label: 'Статус', type: 'select', options: [
    { label: 'Все', value: '' },
    { label: 'Выполнен', value: 'completed' },
    { label: 'В обработке', value: 'processing' },
    { label: 'Отменен', value: 'cancelled' },
  ] },
];

const filterValues = reactive({ dateFrom: '', dateTo: '', status: '' });
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
  const { data } = await api.get('/orders', { params });
  items.value = data.data || [];
  total.value = data.meta?.total || 0;
  buildChart();
}

function resetFilters() {
  filterValues.dateFrom = '';
  filterValues.dateTo = '';
  filterValues.status = '';
  page.value = 1;
  fetchData();
}

function onPageChange(newPage) {
  page.value = newPage;
  fetchData();
}

function buildChart() {
  // Группируем количество заказов по датам для графика
  const grouped = {};
  for (const item of items.value) {
    const date = item.date;
    if (!grouped[date]) grouped[date] = 0;
    grouped[date] += 1;
  }
  chartData.value = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: 'Количество заказов',
        data: Object.values(grouped),
        backgroundColor: '#67C23A',
      },
    ],
  };
}

watch([() => filterValues.dateFrom, () => filterValues.dateTo, () => filterValues.status], () => {
  page.value = 1;
});

fetchData();
</script> 