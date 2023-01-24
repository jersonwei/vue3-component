<script setup lang="ts">
import { PropType } from 'vue'
import { toLine } from '../../../utils/func'
import { ActionOptions, ListOptions } from './type'
let props = defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  actions: {
    type: Array as PropType<ActionOptions[]>
  }
})
let emits = defineEmits(['clickItem', 'clickAction'])
const clickContainer = (item: ListOptions, idx: number) => {
  emits('clickItem', { item, idx })
}
const clickAction = (item: ActionOptions, idx: number) => {
  emits('clickAction', { item, idx })
}
</script>
<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane
        v-for="(item, index) in list"
        v-model="item.title"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar max-height="400px">
          <div
            v-for="(subItem, subIdx) in item.content"
            :key="subIdx"
            class="container"
            @click="clickContainer(subItem, subIdx)"
          >
            <div class="avatar">
              <el-avatar :src="subItem.avatar" :size="50"></el-avatar>
            </div>
            <div class="content">
              <div v-if="subItem.title">
                <div>
                  {{ subItem.title }}
                  <el-tag v-if="subItem.tag" :type="subItem.tagType">
                    {{ subItem.tag }}
                  </el-tag>
                </div>
              </div>
              <div>{{ subItem.time || subItem.desc }}</div>
            </div>
          </div>
          <div class="actions">
            <div
              class="a-item"
              @click="clickAction(action, index)"
              v-for="(action, index) in actions"
              :key="index"
            >
              <div class="a-icon">
                <component :is="`el-icon-${toLine(action.icon)}`"></component>
              </div>
              <div class="a-text">{{ action.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  padding: 12px 20px;
  cursor: pointer;
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    flex: 1;
    height: 50px;
    justify-content: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
</style>
