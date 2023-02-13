<script setup lang="ts">
import { ref, watch } from 'vue'

let props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
let emits = defineEmits(['updateVisible'])
let dialogVisible = ref<boolean>(props.visible)
watch(
  () => props.visible,
  value => {
    dialogVisible.value = value
  }
)
watch(
  () => dialogVisible.value,
  value => {
    emits('updateVisible', value)
  }
)
</script>
<template>
  <div>
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>表单</template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped></style>
