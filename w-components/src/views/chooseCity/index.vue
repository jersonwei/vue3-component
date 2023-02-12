<script setup lang="ts">
import { cityItem } from '../../components/chooseCity/src/type'

const handleChangeItem = (item: cityItem) => {
  console.log('城市信息', item)
}
</script>
<template>
  <wChooseCity @changeItem="handleChangeItem"></wChooseCity>
</template>
<style lang="scss" scoped></style>
