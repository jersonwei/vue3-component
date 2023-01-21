<script setup lang="ts">
import { childStreetArrType } from '../../components/chooseStreet/type'

const onChange = (val: childStreetArrType) => {
  console.log(val)
}
</script>
<template>
  <wChooseStreet @change="onChange"></wChooseStreet>
</template>
<style lang="scss" scoped></style>
