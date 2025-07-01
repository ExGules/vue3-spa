<template>
  <el-pagination
    :current-page="page"
    :page-size="pageSize"
    :total="total"
    layout="prev, pager, next"
    @current-change="$emit('update:page', $event)"
  />
</template>

<script setup>
const props = defineProps({
  total: Number,
  page: Number,
  pageSize: Number,
});
</script> 