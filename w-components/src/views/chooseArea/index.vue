<script setup lang="ts">
import { childArrType } from '../../components/chooseArea/type'
const onChange = (val: childArrType) => {
  console.log(val)
}
</script>
<template>
  <wChooseArea @change="onChange"></wChooseArea>
</template>
<style lang="scss" scoped></style>
