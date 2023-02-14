<script setup lang="ts">
import { ref } from 'vue'
let eventGuid = 0
let todayStr = ref<string>(new Date().toISOString().replace(/T.*$/, '')) // YYYY-MM-DD of today
const createEventId = ref<any>()
createEventId.value = () => {
  return String(eventGuid++)
}
const intialEvents = ref<any[]>([])
intialEvents.value = [
  {
    id: createEventId.value(),
    title: 'All-day event',
    start: todayStr.value
  },
  {
    id: createEventId.value(),
    title: 'Timed event',
    start: todayStr.value + 'T12:00:00'
  }
]
</script>
<template>
  <wCalendar
    :INITIAL_EVENTS="intialEvents"
    :createEventId="createEventId"
  ></wCalendar>
</template>
<style lang="scss" scoped></style>
