<script setup lang="ts"></script>
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
  <wNotify :value="22" :icon="'chatRound'"></wNotify>
</template>
<style lang="scss" scoped></style>
