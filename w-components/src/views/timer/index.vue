<script setup lang="ts">
import { ref } from 'vue'

const handleEndChange = (val: string) => {
  console.log('end', val)
}
const handleStartChange = (val: string) => {
  console.log('start', val)
}
const prefixIcons = ref<string>('Document')
const clearIcons = ref<string>('Burger')
let startOptions = {
  size: 'small',
  clearable: false
}
let endOptions = {
  size: 'large',
  clearable: false
}
</script>
<template>
  <wTimer
    @startChange="handleStartChange"
    :startOptions="startOptions"
    :endOptions="endOptions"
    @endChange="handleEndChange"
  ></wTimer>
  <wTimer
    @startChange="handleStartChange"
    @endChange="handleEndChange"
    :prefixIcon="prefixIcons"
    :clearIcon="clearIcons"
  ></wTimer>
</template>
<style lang="scss" scoped></style>
