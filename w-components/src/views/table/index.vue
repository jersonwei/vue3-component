<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { TableOptions } from '../../components/table/src/type'
interface TableData {
  date: string
  name: string
  address: string
}
let current = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(10)
let editRowIndex = ref<string>('')
let tableData = ref<TableData[]>([])
// tableData.value = [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   },
//   {
//     date: '2016-05-04',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   },
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   }
// ]
// const tableData = [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   },
//   {
//     date: '2016-05-04',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   },
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles'
//   }
// ]
let svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
let options: TableOptions[] = [
  {
    prop: 'date',
    label: '日期',
    width: '280',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    prop: 'name',
    label: '姓名',
    width: '280',
    align: 'center',
    slot: 'name'
  },
  {
    prop: 'address',
    width: '380',
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
const editFn = (scope: any) => {
  editRowIndex.value = 'edit'
  console.log('btnEdit', scope)
}
const deleteFn = (scope: any) => {
  console.log('btndelete', scope)
}
const handleCheck = (scope: any) => {
  console.log('handleCheck', scope)
}
const handleClose = (scope: any) => {
  console.log('handleClose', scope)
}
const confirmRowFn = (scope: any) => {
  console.log('confirmRowFn', scope)
}
const cancleRowFn = (scope: any) => {
  console.log('cancleRowFn', scope)
}
const getData = () => {
  axios
    .post('/api/list', {
      current: current.value,
      pageSize: pageSize.value
    })
    .then(res => {
      console.log(res)
      const resData = res.data.data
      tableData.value = resData.rows
      total.value = resData.total
      current.value = resData.current
      pageSize.value = resData.pageSize
    })
}
onMounted(() => {
  getData()
})
const handleSizeChange = (size: number) => {
  console.log(size)
  pageSize.value = size
  getData()
}
const handleCurrentChange = (page: number) => {
  console.log(page)
  current.value = page
  getData()
}
</script>
<template>
  <wTable
    :options="options"
    :data="tableData"
    elementLoadingText="加载中..."
    elementLoadingBackground="rgba(0,0,0,.8)"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    @check="handleCheck"
    @close="handleClose"
    paginationAlign="center"
    isEditRow
    v-model:editRowIndex="editRowIndex"
    :total="total"
    :currentPage="current"
    :pageSize="pageSize"
    pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
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
    <template #editRow="{scope}">
      <el-button type="primary" size="small" @click="confirmRowFn(scope)"
        >确认</el-button
      >
      <el-button type="danger" size="small" @click="cancleRowFn(scope)"
        >取消</el-button
      >
    </template>
    <!-- <template #editCell="{scope}">
      <div class="confiirmBox" style="display: flex;">
        <el-button size="small" type="primary">确认</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </template> -->
  </wTable>
</template>
<style lang="scss" scoped>
.svg {
  width: 1em;
  height: 1em;
}
.confiirmBox {
  padding-left: 6px;
  display: flex;
  position: relative;
  top: 5px;
  cursor: pointer;
}
</style>
