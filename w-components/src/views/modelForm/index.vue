<script setup lang="ts">
import { ref } from 'vue'

let visible = ref<boolean>(false)
let open = () => {
  visible.value = true
}
</script>
<template>
  <el-button @click="open" type="primary">open</el-button>
  <wModelForm title="编辑用户" width="50%" v-model:visible="visible">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </wModelForm>
</template>
<style lang="scss" scoped></style>
