<script setup lang="ts">
import { list, actions } from './data'
import { clickActionObj, clickItemObj } from '../../components/list/src/type'
const handleClickAction = (item: clickActionObj) => {
  console.log(item)
}
const handleClickItem = (item: clickItemObj) => {
  console.log(item)
}
</script>
<template>
  <wNotify :value="50"></wNotify>
  <br />
  <br />
  <wNotify :value="55" :max="22"></wNotify>
  <br />
  <br />
  <wNotify :value="55" isDot></wNotify>
  <br />
  <br />
  <wNotify :value="22" :icon="'chatRound'">
    <template #default>
      <wList
        @clickItem="handleClickItem"
        @clickAction="handleClickAction"
        :list="list"
        :actions="actions"
      ></wList>
    </template>
  </wNotify>
</template>
<style lang="scss" scoped></style>
