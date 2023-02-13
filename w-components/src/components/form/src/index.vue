<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue'
import { FormOptions } from './type/types'
import cloneDeep from 'lodash/cloneDeep'
let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})
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
          v-model="model[item.prop!]"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
        ></component>
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
