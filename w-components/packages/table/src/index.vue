<script setup lang="ts">
import cloneDeep from 'lodash/cloneDeep'
import { computed, onMounted, PropType, ref, watch } from 'vue'
import { toLine } from '../../utils/func'
import { TableOptions } from './type'
let props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  elementLoadingText: {
    type: String
  },
  elementLoadinSpiner: {
    type: String
  },
  elementLoadingBac: {
    type: String
  },
  elementLoadingSvg: {
    type: String
  },
  elememtLoadingSvgViewBox: {
    type: String
  },
  editIcon: {
    type: String,
    default: 'edit'
  },
  isEditRow: {
    type: Boolean,
    default: false
  },
  editRowIndex: {
    type: String
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30, 40, 50]
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    default: 10
  },
  pagination: {
    type: Boolean,
    default: false
  },
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  highlightCurrentRow: {
    type: Boolean,
    default: false
  }
})
let emits = defineEmits([
  'check',
  'close',
  'update:editRowIndex',
  'size-change',
  'current-change',
  'sort-change'
])
// 当前点击的单元格
let currentEdit = ref<string>('')
// 过滤操作项的配置
let tableOptions = computed(() => props.options.filter(item => !item.action))
// 找到操作项的配置
let btnOptions = computed(() => props.options.find(item => item.action))
// loading条件
let isLoading = computed(() => !props.data || !props.data.length)
// 拷贝一份data
let cloneTableData = ref<any[]>(cloneDeep(props.data))
// 拷贝一份标识
let cloneEditRowIndex = ref<string>(props.editRowIndex!)
console.log(cloneTableData.value)
// 监听伏组件传递的数据
watch(
  () => props.data,
  val => {
    cloneTableData.value = cloneDeep(val)
    cloneTableData.value.map(
      item => {
        item.rowEdit = false
      },
      { deep: true }
    )
  }
)
// 监听传递的标识
watch(
  () => props.editRowIndex,
  val => {
    if (val) cloneEditRowIndex.value = val
  }
)
onMounted(() => {
  cloneTableData.value.map(item => {
    item.rowEdit = false
  })
})
const clickEdit = (scope: any) => {
  // 唯一的标识
  currentEdit.value = scope.$index + scope.column.id
  console.log(scope, currentEdit.value)
}
const clickCheck = (scope: any) => {
  currentEdit.value = ''
  console.log(scope)
  emits('check', scope)
}
const clickClose = (scope: any) => {
  currentEdit.value = ''
  console.log(scope)
  emits('close', scope)
}
const clickEditCell = () => {
  currentEdit.value = ''
}
const rowClick = (row: any, column: any) => {
  if (column.label === btnOptions.value?.label) {
    // 编辑行的操作
    if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
      row.rowEdit = !row.rowEdit
      // 重置其他数据
      cloneTableData.value.map(item => {
        if (item !== row) {
          item.rowEdit = false
        }
      })
      // 重置按钮的标识
      if (!row.rowEdit) {
        emits('update:editRowIndex', '')
      }
    }
  }
}
// 分页组件
const handleSizeChange = (size: number) => {
  emits('size-change', size)
}
const handleCurrentChange = (page: number) => {
  emits('current-change', page)
}
const sortChange = (column: any, prop: string, order: string) => {
  emits('sort-change', column)
}
</script>
<template>
  <el-table
    v-bind="$attrs"
    :data="cloneTableData"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadinSpiner"
    :element-loading-background="elementLoadingBac"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elememtLoadingSvgViewBox"
    @row-click="rowClick"
    :highlight-current-row="highlightCurrentRow"
    @sort-change="sortChange"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <!-- <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
      </el-table-column> -->
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop!]" size="small"></el-input>
          </template>
          <template v-else>
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div style="display: flex">
                <el-input v-model="scope.row[item.prop!]" type="text" />
                <div @click.stop="clickEditCell">
                  <!-- 父组件传递的插槽 -->
                  <slot
                    name="editCell"
                    :scope="scope"
                    v-if="$slots.editCell"
                  ></slot>
                  <div class="icons" v-else>
                    <el-icon-check
                      @click.stop="clickCheck(scope)"
                      class="check"
                    ></el-icon-check>
                    <el-icon-close
                      class="close"
                      @click.stop="clickClose(scope)"
                    ></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div style="display: flex;justify-content: center;">
                <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                <span v-else>{{ scope.row[item.prop!] }}</span>
                <component
                  :is="`el-icon-${toLine(editIcon)}`"
                  class="edit"
                  @click.stop="clickEdit(scope)"
                  v-if="item.editable"
                ></component>
              </div>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="btnOptions?.label"
      :align="btnOptions?.align"
      :width="btnOptions?.width"
    >
      <template #default="scope">
        <slot name="editRow" v-if="scope.row.rowEdit" :scope="scope"></slot>
        <slot name="action" :scope="scope" v-else></slot>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="pagination">
    <el-pagination
      :currentPage="currentPage"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style lang="scss" scoped>
.edit {
  position: relative;
  top: 4px;
  margin-left: 9px;
  cursor: pointer;
  right: 2px;
  width: 1em;
  height: 1em;
}
.icons {
  display: flex;
  position: relative;
  top: 8px;
  cursor: pointer;
  svg {
    width: 1em;
    height: 1em;
    margin-left: 9px;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
</style>
