<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { FormInstance, FormOptions } from '../../form/src/type/types'

let props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  isScroll: {
    type: Boolean,
    default: true
  },
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
  }
})
// 表单实例
let form = ref<FormInstance | null>()
let emits = defineEmits(['updateVisible'])
let dialogVisible = ref<boolean>(props.visible)
watch(
  () => props.visible,
  value => {
    dialogVisible.value = value
  }
)
watch(
  () => dialogVisible.value,
  value => {
    emits('updateVisible', value)
  }
)
</script>
<template>
  <div class="w--choose-icon-dialog-body-height">
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <wForm
          label-width="100px"
          :options="options"
          ref="form"
          @on-change="onChange"
          @before-upload="beforeUpload"
          @on-preview="onPreview"
          @on-remove="onRemove"
          @before-remove="beforeRemove"
          @on-success="onSuccess"
          @on-exceed="onExceed"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </wForm>
      </template>
      <template #footer>
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped></style>
