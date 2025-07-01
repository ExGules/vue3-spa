<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column
      v-for="col in columns"
      :key="col.prop"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
    />
  </el-table>
</template>

<script setup>
const props = defineProps({
  columns: Array,
  data: Array,
});
</script> 