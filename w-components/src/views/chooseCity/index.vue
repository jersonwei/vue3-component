<script setup lang="ts">
import { cityItem } from '../../components/chooseCity/src/type'

const handleChangeItem = (item: cityItem) => {
  console.log('城市信息', item)
}
const handleChangeProItem = (item: string) => {
  console.log('省份信息', item)
}
</script>
<template>
  <wChooseCity
    @changeItem="handleChangeItem"
    @changeProItem="handleChangeProItem"
  ></wChooseCity>
</template>
<style lang="scss" scoped></style>
