<script setup lang="ts">
import { toLine } from '../../../utils/func'

let props = defineProps({
  icon: {
    type: String,
    default: 'Bell'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number
  },
  isDot: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <el-popover placement="top-start" :width="200" trigger="click">
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge :value="value" :max="max" :is-dot="isDot" class="item">
        <component :is="`el-icon-${toLine(icon)}`"></component>
      </el-badge>
    </template>
  </el-popover>
</template>
<style lang="scss" scoped></style>
