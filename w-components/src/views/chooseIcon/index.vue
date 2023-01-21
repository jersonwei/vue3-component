<script setup lang="ts">
import { ref } from 'vue'
let title = ref<string>('选择图标')
let visible = ref<boolean>(false)
</script>
<template>
  <div>
    <wChooseIcon :title="title" v-model:visible="visible">
      选择图标
    </wChooseIcon>
  </div>
</template>
<style lang="scss" scoped></style>
