<template>
  <el-form :inline="true" @submit.prevent>
    <el-form-item v-for="filter in filters" :key="filter.prop" :label="filter.label">
      <component
        :is="filter.type === 'select' ? 'el-select' : filter.type === 'date' ? 'el-date-picker' : 'el-input'"
        v-model="modelValue[filter.prop]"
        v-bind="filter.props"
        style="min-width: 120px"
      >
        <el-option
          v-for="option in filter.options || []"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </component>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('search')">Поиск</el-button>
      <el-button @click="$emit('reset')">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const props = defineProps({
  filters: Array,
  modelValue: Object,
});
const emit = defineEmits(['update:modelValue', 'search', 'reset']);
</script> 