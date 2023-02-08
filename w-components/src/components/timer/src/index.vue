<script setup lang="ts">
import { ref, watch } from 'vue'
let props = defineProps({
  startPlaceHolder: {
    type: String,
    default: '请选择开始时间'
  },
  startTimeStart: {
    type: String,
    default: '8:00'
  },
  startStep: {
    type: String,
    default: '00:30'
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
  },
  startTimeEnd: {
    type: String,
    default: '24:00'
  },
  endPlaceHolder: {
    type: String,
    default: '请选择结束时间'
  },
  endTimeStart: {
    type: String,
    default: '8:00'
  },
  endStep: {
    type: String,
    default: '00:30'
  },
  endTimeEnd: {
    type: String,
    default: '24:00'
  }
})
let startTime = ref<string>('')
let endTime = ref<string>('')
let endTimeDisabled = ref<boolean>(true)
let emits = defineEmits(['startChange', 'endChange'])
// 监听开始时间变化
watch(
  () => startTime.value,
  val => {
    if (val === '') {
      endTime.value = ''
      endTimeDisabled.value = true
    } else {
      endTimeDisabled.value = false
      emits('startChange', val)
    }
  }
)
watch(
  () => endTime.value,
  val => {
    if (val !== '')
      emits('endChange', {
        startTime: startTime.value,
        endTime: val
      })
  }
)
</script>
<template>
  <div>
    <el-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      :placeholder="props.startPlaceHolder"
      :start="props.startTimeStart"
      :step="props.startStep"
      :end="props.startTimeEnd"
      :prefix-icon="props.prefixIcon"
      v-bind="$attrs.startOptions"
    />
    <el-time-select
      v-model="endTime"
      :clear-icon="props.clearIcon"
      :min-time="startTime"
      :placeholder="props.endPlaceHolder"
      :disabled="endTimeDisabled"
      :start="props.endTimeStart"
      :step="props.endStep"
      :end="props.endTimeEnd"
      v-bind="$attrs.endOptions"
    />
  </div>
</template>
<style lang="scss" scoped></style>
