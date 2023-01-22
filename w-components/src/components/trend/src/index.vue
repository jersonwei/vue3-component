<script setup lang="ts">
import { computed, onMounted, useSlots } from 'vue'
import { toLine } from '../../../utils/func'

let props = defineProps({
  // 标记当前趋势是上升还是下降
  type: {
    type: String,
    default: 'up'
  },
  // 趋势显示的文字
  // 1 父组件传递过来的数据
  // 2 插槽
  text: {
    type: String,
    default: '文章'
  },
  // 颜色反转只改变默认颜色
  reverseClolr: {
    type: Boolean,
    default: false
  },
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  downIcon: {
    type: String,
    default: 'ArrowDown'
  },
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  upTextColor: {
    type: String,
    default: '#f5222d'
  },
  downTextColor: {
    type: String,
    default: '#52c41a'
  }
})
let slots = useSlots()
onMounted(() => {})
let textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>
<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <slot v-if="slots.default"></slot>
      <div v-else>
        {{ text }}
      </div>
    </div>
    <div class="icon">
      <!-- <el-icon-arrowup
        :style="{ color: !reverseClolr ? upIconColor : '#52c41a' }"
        v-if="type === 'up'"
      ></el-icon-arrowup>
      <el-icon-arrowdown
        :style="{ color: !reverseClolr ? downIconColor : '#f5222d' }"
        v-else
      ></el-icon-arrowdown> -->
      <component
        :style="{ color: !reverseClolr ? upIconColor : '#52c41a' }"
        v-if="type === 'up'"
        :is="`el-icon-${toLine(upIcon)}`"
      ></component>
      <component
        :style="{ color: !reverseClolr ? downIconColor : '#f5222d' }"
        v-else
        :is="`el-icon-${toLine(downIcon)}`"
      ></component>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    margin-right: 4px;
  }
  .icon {
    svg {
      width: 1em;
      height: 1em;
    }
  }
}
</style>
