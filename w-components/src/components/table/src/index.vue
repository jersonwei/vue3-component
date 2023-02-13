<script setup lang="ts">
import { PropType } from 'vue'
import { TableOptions } from './type'

let props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})
</script>
<template>
  <el-table :data="data">
    <template v-for="(item, index) in options" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
      </el-table-column>
    </template>
  </el-table>
</template>
<style lang="scss" scoped></style>
