<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import { toLine } from '../../../utils/func'
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
  }
})
let emits = defineEmits(['check', 'close'])
// 当前点击的单元格
let currentEdit = ref<string>('')
// 过滤操作项的配置
let tableOptions = computed(() => props.options.filter(item => !item.action))
// 找到操作项的配置
let btnOptions = computed(() => props.options.find(item => item.action))
let isLoading = computed(() => !props.data || !props.data.length)
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
</script>
<template>
  <el-table
    :data="data"
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadinSpiner"
    :element-loading-background="elementLoadingBac"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elememtLoadingSvgViewBox"
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
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.$index + scope.column.id === currentEdit">
            <div style="display: flex">
              <el-input v-model="scope.row[item.prop!]" type="text" />
              <div @click="clickEditCell">
                <!-- 父组件传递的插槽 -->
                <slot
                  name="editCell"
                  :scope="scope"
                  v-if="$slots.editCell"
                ></slot>
                <div class="icons" v-else>
                  <el-icon-check
                    @click="clickCheck(scope)"
                    class="check"
                  ></el-icon-check>
                  <el-icon-close
                    class="close"
                    @click="clickClose(scope)"
                  ></el-icon-close>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div style="display: flex;">
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <component
                :is="`el-icon-${toLine(editIcon)}`"
                class="edit"
                @click="clickEdit(scope)"
                v-if="item.editable"
              ></component>
            </div>
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
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
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
