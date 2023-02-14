<script setup lang="ts">
import { ref } from 'vue'
import navHeader from '../src/navHeader/index.vue'
import navAside from '../src/navAside/index.vue'
const isCollapse = ref(false)
</script>
<template>
  <el-container>
    <el-aside width="auto">
      <navAside :collapse="isCollapse"></navAside>
    </el-aside>
    <el-container>
      <el-header>
        <navHeader v-model:collapse="isCollapse"></navHeader>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.el-header {
  padding: 0;
  border-bottom: 1px solid #eee;
}
</style>
