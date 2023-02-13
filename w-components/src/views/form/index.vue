<script setup lang="ts">
import { FormOptions } from '../../components/form/src/type/types'

let options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    attrs: {
      clearable: true
    },
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'change'
      },
      {
        min: 2,
        max: 50,
        message: '用户名最少2位，最多50位',
        trigger: 'change'
      }
    ]
  },
  {
    type: 'input',
    value: '',
    prop: 'password',
    label: '密码',
    attrs: {
      clearable: true,
      showPassword: true
    },
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'change'
      },
      {
        min: 7,
        max: 15,
        message: '密码最少7位，最多15位',
        trigger: 'change'
      }
    ]
  },
  {
    type: 'select',
    value: '1',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs: {
      filterable: true,
      clearable: true
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '店长',
        value: '2'
      },
      {
        type: 'option',
        label: '助理',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      }
    ]
  },
  {
    type: 'radio-group',
    value: [],
    prop: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: '1'
      },
      {
        type: 'radio',
        label: '女',
        value: '2'
      }
    ]
  }
]
</script>
<template>
  <wForm :options="options" label-width="100px"></wForm>
</template>
<style lang="scss" scoped></style>
