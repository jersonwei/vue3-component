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
  <el-badge :value="value" :max="max" :is-dot="isDot" class="item">
    <component :is="`el-icon-${toLine(icon)}`"></component>
  </el-badge>
</template>
<style lang="scss" scoped></style>
