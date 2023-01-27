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
      { name: '导航3-2', icon: 'document', index: '3-2' },
      { name: '导航3-3', icon: 'document', index: '3-3' }
    ]
  }
])
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
  <div style="width: 200px">
    <wMenu :data="data1"></wMenu>
    <wInfiniteMenu :data="data2" :defaultActive="'3-1-1-1-1'"></wInfiniteMenu>
  </div>
</template>
<style lang="scss" scoped></style>
