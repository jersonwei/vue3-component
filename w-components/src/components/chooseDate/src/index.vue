<script setup lang="ts">
import { ref, watch } from 'vue'
let props = defineProps({
  startPlaceHolder: {
    type: String,
    default: '请选择开始日期'
  },
  endPlaceHolder: {
    type: String,
    default: '请选择结束日期'
  },
  disableToday: {
    type: Boolean,
    default: true
  },
  // 前缀图标
  prefixIcon: {
    type: String,
    default: 'Clock'
  },
  // 清除图标
  clearIcon: {
    type: String,
    default: 'CircleClose'
  }
})
let emits = defineEmits(['startTimechange', 'endTimechange'])
let startDate = ref<Date | any>(null)
let endDate = ref<Date | any>(null)
let endDateDisabled = ref<boolean>(true)
let startDateDisabled = (time: Date) => {
  if (props.disableToday) return time.getTime() <= Date.now() - 1000 * 60 * 60
  emits('startTimechange', time)
}
let endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value!.getTime() + 1000 * 60 * 60
  }
}
watch(
  () => startDate.value,
  val => {
    endDateDisabled.value = !!!val
    endDate.value = ''
  }
)
watch(
  () => endDate.value,
  val => {
    emits('endTimechange', {
      startTime: startDate.value,
      endTime: val
    })
  }
)
</script>
<template>
  <el-date-picker
    v-model="startDate"
    :disabled-date="startDateDisabled"
    :placeholder="props.startPlaceHolder"
    :prefix-icon="props.prefixIcon"
    v-bind="$attrs.startOptions"
  />
  <el-date-picker
    v-model="endDate"
    :disabled-date="endDisabledDate"
    :disabled="!startDate"
    :clear-icon="props.clearIcon"
    :placeholder="props.endPlaceHolder"
    v-bind="$attrs.endOptions"
  />
</template>
<style lang="scss" scoped></style>
