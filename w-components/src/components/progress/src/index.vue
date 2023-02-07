<script setup lang="ts">
import { onMounted, ref } from 'vue'

let props = defineProps({
  percentage: {
    type: Number,
    default: 0
  },
  isAnimation: {
    type: Boolean,
    default: false
  },
  time: {
    type: Number,
    default: 0
  }
})
let p = ref(0)
let emits = defineEmits(['fullProgress'])
onMounted(() => {
  if (props.isAnimation) {
    let t = Math.ceil(props.time / props.percentage)
    let timer = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        emits('fullProgress', p.value)
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})
</script>
<template>
  <el-progress :percentage="p" v-bind="$attrs"></el-progress>
</template>
<style lang="scss" scoped></style>
