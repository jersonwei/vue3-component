<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'
interface arrType {
  code?: string
  name?: string
}
let province = ref<string>('')
let city = ref<string>('')
let area = ref<string>('')
let cityList = ref<any>([])
let areaList = ref<any>([])
const allAreasCopy = ref(allAreas)
const changeProvince = (val: string | undefined) => {}
watch(
  () => province.value,
  val => {
    if (!val) {
      cityList.value = []
      city.value = ''
      return
    }
    cityList.value = allAreas.find(i => i.code === val)?.children
    // 是否自动展示第一项
    city.value = cityList.value[0].code
  }
)
watch(
  () => city.value,
  val => {
    if (!val) {
      areaList.value = []
      area.value = ''
      return
    }
    areaList.value = cityList.value.find((i: any) => i.code === val)?.children
    // 是否自动展示第一项
    area.value = areaList.value[0].code
  }
)
onMounted(() => {
  // province.value = allAreas
})
computed(() => {})
</script>
<template>
  <div>
    <el-select
      v-model="province"
      placeholder="请选择省份"
      @change="changeProvince"
      clearable
    >
      <el-option
        v-for="item in allAreasCopy"
        :value="item.code"
        :key="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      :disabled="!province"
      style="margin: 0 10px"
      v-model="city"
      clearable
      placeholder="请选择城市"
    >
      <el-option
        v-for="item in cityList"
        :value="item.code"
        :key="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      :disabled="!province || !city"
      v-model="area"
      placeholder="请选择地区"
      clearable
    >
      <el-option
        v-for="item in areaList"
        :value="item.code"
        :key="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>
<style lang="scss" scoped></style>
