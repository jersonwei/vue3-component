<script setup lang="ts">
import { watch, ref } from 'vue'
import { useCopy, copyToClipoard } from '../../hooks/useCopy/index'
import * as ElIcons from '@element-plus/icons-vue'
import { toLine } from '../../utils/func'
let props = defineProps<{ title: string; visible: boolean }>()
let emits = defineEmits(['update:visible'])
let dialogVisible = ref<boolean>(props.visible)
const clickItem = (item: string) => {
  console.log(item, `<el-icon-${toLine(item)} />`)
  const text = `<el-icon-${toLine(item)} />`
  // useCopy(text)
  copyToClipoard(text)
  dialogVisible.value = false
}
const handleClick = () => {
  dialogVisible.value = !dialogVisible.value
  emits('update:visible', !props.visible)
}
watch(
  () => props.visible,
  val => {
    dialogVisible.value = val
  }
)
watch(
  () => dialogVisible.value,
  val => {
    emits('update:visible', val)
  }
)
</script>
<template>
  <el-button @click="handleClick">
    <slot></slot>
  </el-button>
  <div class="w--choose-icon-dialog-body-height">
    <el-dialog :title="props.title" v-model="dialogVisible">
      <div class="container">
        <div
          v-for="(item, index) in Object.keys(ElIcons)"
          class="item"
          @click="clickItem(item)"
          :key="index"
        >
          <div>
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div>{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    cursor: pointer;
    font-size: 13px;
  }
  svg {
    width: 2em;
    height: 2em;
  }
}
</style>
