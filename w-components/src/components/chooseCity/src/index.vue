<script setup lang="ts">
import { ref } from 'vue'
import city from '../lib/city'
let result = ref<string>('请选择')
let visible = ref<boolean>(false)
let radioValue = ref<string>('按城市')
let selectValue = ref<string>('')
let cities = ref(city.cities)
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
</script>
<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    :width="500"
    trigger="click"
  >
    <template #reference>
      <div class="result">
        <div>{{ result }}</div>
        <div>
          <el-icon-arrowdown :class="{ rotate: visible }"></el-icon-arrowdown>
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :offset="1" :span="15">
          <el-select
            v-model="selectValue"
            class="m-2"
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <div class="city">
        <!-- <div v-for="(value, key) in cities">{{ key }}</div> -->
        <div
          class="city-item"
          :key="index"
          v-for="(item, index) in Object.keys(cities)"
        >
          {{ item }}
        </div>
        <el-scrollbar max-height="400px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row style="margin-bottom: 6px;">
              <el-col :span="2">{{ key }}</el-col>
              <el-col class="city-name" :span="22">
                <div
                  class="city-name-item"
                  v-for="(item, index) in value"
                  :key="item.id"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </div>
    </div>
  </el-popover>
</template>
<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}
svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s linear;
}
.rotate {
  transform: rotate(180deg);
}
.container {
  padding: 6px;
}
.city {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
  }
}
.city-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    margin-right: 6px;
    margin-bottom: 6px;
  }
}
</style>
