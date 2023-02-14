<script setup lang="ts">
import { menuItem } from './type'
import { PropType } from 'vue'
import { toLine } from '../../utils/func'
let props = defineProps({
  data: {
    type: Array as PropType<menuItem[]>,
    required: true
  },
  // 默认选中项
  defaultActive: {
    type: String,
    default: ''
  },
  // 路由模式
  router: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <el-menu :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="item in data" :key="item.index">
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.index"
      >
        <component
          v-if="item.icon"
          :is="`el-icon-${toLine(item.icon)}`"
        ></component>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.index"
        v-if="item.children && item.children.length"
      >
        <template #title>
          <component
            v-if="item.icon"
            :is="`el-icon-${toLine(item.icon)}`"
          ></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="item1 in item.children" :key="item1.index">
          <component
            v-if="item1.icon"
            :is="`el-icon-${toLine(item1.icon)}`"
          ></component>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>
<style lang="scss" scoped>
svg {
  margin-right: 4px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
