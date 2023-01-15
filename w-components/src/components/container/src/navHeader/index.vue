<script setup lang="ts">
let props = defineProps<{ collapse: boolean }>()
let emits = defineEmits(['update:collapse'])
const toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>
<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand class="pointer" v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else class="pointer"></el-icon-fold>
    </span>
  </div>
</template>
<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.pointer {
  cursor: pointer;
}
</style>
