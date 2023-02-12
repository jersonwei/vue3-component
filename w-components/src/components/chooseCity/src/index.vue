<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { cityItem } from './type'
import city from '../lib/city'
import province from '../lib/province.json'
let emits = defineEmits(['changeItem', 'changeProItem'])
// 选择的结果
let result = ref<string>('请选择')
// 弹出层显示
let visible = ref<boolean>(false)
// 单选框的值
let radioValue = ref<string>('按省份')
// 选择框的值
let selectValue = ref<string>('')
// 默认数据
let cities = ref(city.cities)
let provinces = ref(province)
const clickItem = (item: cityItem) => {
  result.value = item.name
  visible.value = false
  emits('changeItem', item)
}
const clickChat = (item: string) => {
  let el = document.getElementById(item)!
  el && el.scrollIntoView()
}
const clickProvinceItem = (item: string) => {
  result.value = item
  visible.value = false
  emits('changeProItem', item)
}
let options = ref<cityItem[]>([])
let allCity = ref<cityItem[]>([])
// 自定义搜索过滤
const filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2)
  console.log(val)
  if (val === '') {
    options.value = values
  } else {
    if (radioValue.value === '按城市') {
      // 中英文一起过滤
      options.value = values.filter(item => {
        return item.name.includes(val) || item.spell.includes(val)
      })
      console.log(options.value)
    } else {
      options.value = values.filter(item => {
        return item.name.includes(val)
      })
      console.log(options.value)
    }
  }
}
onMounted(() => {
  let values = Object.values(cities.value).flat(2)
  allCity.value = values
  options.value = values
})
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
            filterable
            clearable
            placeholder="请搜索"
            size="small"
            :filter-method="filterMethod"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <!-- 按城市 -->
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <!-- <div v-for="(value, key) in cities">{{ key }}</div> -->
          <!-- 字母区域 -->
          <div
            class="city-item"
            :key="index"
            @click="clickChat(item)"
            v-for="(item, index) in Object.keys(provinces)"
          >
            {{ item }}
          </div>
        </div>
        <!-- 城市区域 -->
        <el-scrollbar max-height="400px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row style="margin-bottom: 6px;" :id="key">
              <el-col :span="3">{{ key }}</el-col>
              <el-col class="city-name" :span="21">
                <div
                  class="city-name-item"
                  v-for="(item, index) in value"
                  :key="item.id"
                  @click="clickItem(item)"
                >
                  {{ item.name }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <!-- 按省份 -->
      <template v-else>
        <div class="province">
          <div
            class="province-item"
            v-for="(item, index) in Object.keys(provinces)"
            :key="index"
            @click="clickChat(item)"
          >
            {{ item }}
          </div>
        </div>
        <!-- 省份区域 -->
        <el-scrollbar max-height="400px">
          <template
            v-for="(item, index) in Object.values(provinces)"
            :key="index"
          >
            <template v-for="(subItem, subIdx) in item" :key="subIdx">
              <el-row style="margin-bottom: 6px;" :id="subItem.id">
                <el-col :span="3">{{ subItem.name }}</el-col>
                <el-col class="province-name" :span="21">
                  <div
                    class="province-name-item"
                    v-for="(thrItem, thrIndex) in subItem.data"
                    :key="thrIndex"
                    @click="clickProvinceItem(thrItem)"
                  >
                    {{ thrItem }}
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
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
.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .city-item,
  .province-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
  }
}
.city-name,
.province-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  .city-name-item,
  .province-name-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
}
</style>
