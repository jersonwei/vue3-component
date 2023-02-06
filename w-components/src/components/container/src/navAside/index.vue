<script setup lang="ts">
let props = defineProps<{ collapse: boolean }>()
let data = [
  {
    icon: 'HomeFilled',
    name: '首页',
    index: '/'
  },
  {
    icon: 'Check',
    name: '图标选择器',
    index: '/iconChoose'
  },
  {
    icon: 'Location',
    name: '省市区选择',
    index: '/areaChoose'
  },
  {
    icon: 'LocationInformation',
    name: '省市区县选择',
    index: 'streetChoose'
  },
  {
    icon: 'LocationFilled',
    name: '省市区级联选择',
    index: 'areaCascader'
  },
  {
    icon: 'Sort',
    name: '趋势标记',
    index: '/trend'
  },
  {
    icon: 'Timer',
    name: '时间选择',
    index: '/chooseTime'
  },
  {
    icon: 'Bell',
    name: '通知菜单',
    index: '/notify'
  },
  {
    icon: 'Menu',
    name: '导航菜单',
    index: '/menu'
  },
  {
    icon: 'TurnOff',
    name: '城市选择',
    index: '/chooseCity'
  },
  {
    icon: 'DArrowRight',
    name: '进度条',
    index: '/progress'
  },
  {
    icon: 'ScaleToOriginal',
    name: '日历',
    index: '/calendar'
  },
  {
    icon: 'Setting',
    name: '表单',
    index: '/form'
  },
  {
    icon: 'Setting',
    name: '弹出框表单',
    index: '/modalForm'
  },
  {
    icon: 'ShoppingBag',
    name: '表格',
    index: '/table'
  }
]
</script>
<template>
  <!-- <el-menu
    :collapse="collapse"
    default-active="2"
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="1">
      <el-icon-menu></el-icon-menu>
      <span>导航 One</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon-menu></el-icon-menu>
      <span>导航 Two</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon-menu></el-icon-menu>
      <span>导航 Three</span>
    </el-menu-item>
  </el-menu> -->
  <wMenu
    :collapse="collapse"
    router
    :defaultActive="$route.path"
    :data="data"
  ></wMenu>
</template>
<style lang="scss" scoped></style>
