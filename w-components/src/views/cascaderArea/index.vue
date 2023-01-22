<script setup lang="ts">
const onChange = (val: any) => {
  console.log('级联数据', val)
}
const onRemoveTag = (val: any) => {
  console.log('移除事件', val)
}
</script>
<template>
  <wCascaderArea @change="onChange" @remove-tag="onRemoveTag"></wCascaderArea>
</template>
<style lang="scss" scoped></style>
