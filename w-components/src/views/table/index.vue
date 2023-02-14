<script setup lang="ts">
import { TableOptions } from '../../components/table/src/type'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
let options: TableOptions[] = [
  {
    prop: 'date',
    label: '日期',
    // width: '180',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    prop: 'name',
    label: '姓名',
    // width: '180',
    align: 'center',
    slot: 'name'
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center',
    editable: true
  },
  {
    label: '操作',
    action: true,
    align: 'center'
  }
]
const editFn = (scope: Boolean) => {}
const deleteFn = (scope: Boolean) => {}
</script>
<template>
  <wTable :options="options" :data="tableData">
    <template #date="{scope}">
      <div style="display: flex; align-items: center">
        <el-icon><timer /></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </div>
    </template>
    <template #name="{scope}">
      <div style="display: flex; align-items: center;justify-content: center;">
        <el-tag>{{ scope.row.name }}</el-tag>
      </div>
    </template>
    <template #action="{scope}">
      <el-button type="primary" size="small" @click="editFn(scope)"
        >编辑</el-button
      >
      <el-button type="danger" size="small" @click="deleteFn(scope)"
        >删除</el-button
      >
    </template>
  </wTable>
</template>
<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
