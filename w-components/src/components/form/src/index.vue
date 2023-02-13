<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue'
import { FormOptions } from './type/types'
import cloneDeep from 'lodash/cloneDeep'
let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function
  }
})
let emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-upload',
  'before-remove',
  'on-exceed'
])
let model = ref<any>(null)
let rules = ref<any>(null)
// 初始化表单
const initForm = () => {
  let m: any = {}
  let r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules as any
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}
// 上传组件的所有方法
let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}
onMounted(() => {
  initForm()
})
watch(
  () => props.options,
  (val: FormOptions[]) => {
    initForm()
  },
  { deep: true }
)
</script>
<template>
  <el-form
    v-if="model"
    :model="model"
    :rules="rules"
    v-bind="$attrs"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload'"
          v-model="model[item.prop!]"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
        ></component>
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <!-- 插槽 -->
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
        >
          <component
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            :is="`el-${subItem.type}`"
            :label="subItem.label"
            :value="subItem.value"
          >
          </component>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>
<style lang="scss" scoped></style>
