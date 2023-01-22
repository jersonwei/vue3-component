<script setup lang="ts">
import { ref } from 'vue'
import cascaderData from '../../chooseArea/lib/pca-code.json'
let emits = defineEmits(['change', 'remove-tag'])
const props = ref({
  multiple: true,
  label: 'name',
  value: 'code'
})
const changeEvent = (val: any) => {
  emits('change', val)
}
const removeTagEvent = (val: any) => {
  console.log(val)
  emits('remove-tag', val)
}
</script>
<template>
  <el-cascader
    :options="cascaderData"
    @remove-tag="removeTagEvent"
    placeholder="请选择省市区"
    :props="props"
    @change="changeEvent"
    collapse-tags
    collapse-tags-tooltip
    clearable
  />
</template>
<style lang="scss" scoped></style>
