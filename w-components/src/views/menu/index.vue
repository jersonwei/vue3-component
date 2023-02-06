<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { menuItem } from '../../components/menu/src/type'

let data1 = ref<menuItem[]>([
  {
    name: '导航1',
    icon: 'document',
    index: '1',
    children: [{ name: '导航1-1', icon: 'document', index: '1-1' }]
  },
  {
    name: '导航2',
    icon: 'document',
    index: '2',
    children: [{ name: '导航2-1', icon: 'document', index: '2-1' }]
  },
  {
    name: '导航3',
    icon: 'document',
    index: '3',
    children: [{ name: '导航3-1', icon: 'document', index: '3-1' }]
  }
])
let data2 = ref<menuItem[]>([
  {
    name: '导航1',
    icon: 'document',
    index: '1',
    children: [{ name: '导航1-1', icon: 'document', index: '1-1' }]
  },
  {
    name: '导航2',
    icon: 'document',
    index: '2',
    children: [{ name: '导航2-1', icon: 'document', index: '2-1' }]
  },
  {
    name: '导航3',
    icon: 'document',
    index: '3',
    children: [
      {
        name: '导航3-1',
        icon: 'document',
        index: '3-1',
        children: [
          {
            name: '导航3-1-1',
            icon: 'document',
            index: '3-1-1',
            children: [
              {
                name: '导航3-1-1-1',
                icon: 'document',
                index: '3-1-1-1',
                children: [
                  {
                    name: '导航3-1-1-1-1',
                    icon: 'document',
                    index: '3-1-1-1-1'
                  }
                ]
              }
            ]
          }
        ]
      },
      { name: '导航3-2', icon: 'document', index: '3-2', children: [] },
      { name: '导航3-3', icon: 'document', index: '3-3', children: [] }
    ]
  }
])
const mockData = [
  {
    title: '系统管理',
    index: 'sys',
    icon: 'Menu',
    code: '1',
    children: [
      {
        title: '权限管理',
        index: 'permission',
        icon: 'User',
        code: '1-1',
        children: [
          { code: '1-1-1', title: '角色管理', index: 'role', icon: 'User' },
          { title: '资源管理', code: '1-1-2', index: 'res', icon: 'User' }
        ]
      },
      {
        code: '1-2',
        title: '字典管理',
        index: 'dict',
        icon: 'User'
      }
    ]
  },
  {
    title: '营销管理',
    index: '2',
    icon: 'Menu',
    code: '2'
  },
  {
    title: '测试',
    index: 'test',
    code: '3',
    icon: 'Menu',
    children: [
      {
        title: '测试-1',
        index: 'test-1',
        code: 'test-1',
        icon: 'Document',
        children: [
          {
            title: '测试-1-1',
            index: 'test-1-1',
            code: 'test-1-1',
            icon: 'Document',
            children: [
              {
                title: '测试-1-1-1',
                index: 'test-1-1-1',
                code: 'test-1-1-1',
                icon: 'Document'
              }
            ]
          },
          {
            title: '测试-1-2',
            index: 'test-1-2',
            code: 'test-1-2',
            icon: 'Document'
          }
        ]
      }
    ]
  }
]
// onMounted(() => {
//   data1.value = [
//     {
//       name: '导航1',
//       icon: 'document',
//       index: '1',
//       children: [{ name: '导航1-1', icon: 'document', index: '1-1' }]
//     },
//     {
//       name: '导航2',
//       icon: 'document',
//       index: '2',
//       children: [{ name: '导航2-1', icon: 'document', index: '2-1' }]
//     },
//     {
//       name: '导航3',
//       icon: 'document',
//       index: '3',
//       children: [{ name: '导航3-1', icon: 'document', index: '3-1' }]
//     }
//   ]
// })
</script>
<template>
  <div style="windexth: 200px">
    <wMenu :data="data1"></wMenu>

    <!-- <wInfiniteMenu :data="data2" :defaultActive="'3-1-1-1-1'"></wInfiniteMenu> -->
    <wInfiniteMenu
      :data="mockData"
      :defaultActive="'3-1-1-1-1'"
    ></wInfiniteMenu>
  </div>
</template>
<style lang="scss" scoped></style>
