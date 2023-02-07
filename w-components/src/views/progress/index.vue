<script setup lang="ts">
const handleProgress = (val: Number) => {
  console.log(val)
}
</script>
<template>
  <div>
    <wProgress
      @fullProgress="handleProgress"
      isAnimation
      :percentage="60"
    ></wProgress>
    <wProgress :percentage="40" status="success"></wProgress>
    <wProgress isAnimation :percentage="60" :stroke-width="20"></wProgress>
    <wProgress
      isAnimation
      :percentage="60"
      :stroke-width="34"
      type="circle"
    ></wProgress>
  </div>
</template>
<style lang="scss" scoped></style>
