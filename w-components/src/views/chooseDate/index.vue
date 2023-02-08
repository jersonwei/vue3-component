<script setup lang="ts">
import { ref } from 'vue'

const handleStartTimeChange = (time: Date) => {
  console.log('starttime', time)
}
const handleEndTimeChange = (time: Date) => {
  console.log('endTime', time)
}
let startOptions = {
  size: 'small',
  clearable: false
}
let endOptions = {
  size: 'large',
  clearable: true
}
const prefixIcons = ref<string>('Document')
const clearIcons = ref<string>('Burger')
</script>
<template>
  <wChooseDate
    @startTimechange="handleStartTimeChange"
    @endTimechange="handleEndTimeChange"
    :startOptions="startOptions"
    :endOptions="endOptions"
    :prefixIcon="prefixIcons"
    :clearIcon="clearIcons"
  ></wChooseDate>
</template>
<style lang="scss" scoped></style>
