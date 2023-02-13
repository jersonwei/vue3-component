<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { FormInstance, FormOptions } from '../../components/form/src/type/types'

let visible = ref<boolean>(false)
let open = () => {
  visible.value = true
}
let confirmDialog = (form: any) => {
  let validate = form.validate()
  let data = form.getFormData()
  console.log(form, data)
  validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('验证成功')
    } else {
      ElMessage.error('验证失败')
    }
  })
}
let handleSuccess = (val: any) => {
  console.log('success')
  console.log(val)
}
let handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
let handleBeforeUpload = (val: any) => {
  console.log('before-upload')
  console.log(val)
}
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
  },
  {
    type: 'upload',
    label: '上传',
    prop: 'pic',
    rules: [
      {
        required: true,
        message: '文件不能为空',
        trigger: 'change'
      }
    ],
    uploadAttrs: {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      multiple: true,
      limit: 3
    }
  },
  {
    type: 'editor',
    value: '123',
    prop: 'desc',
    label: '描述',
    placeholder: '请输入描述',
    rules: [
      {
        required: true,
        message: '描述不能为空',
        trigger: 'change'
      }
    ]
  }
]
</script>
<template>
  <el-button @click="open" type="primary">open</el-button>
  <wModelForm
    :options="options"
    title="编辑用户"
    width="50%"
    :on-change="handleChange"
    :on-success="handleSuccess"
    :beforeUpload="handleBeforeUpload"
    v-model:visible="visible"
  >
    <template #footer="{form}">
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmDialog(form)">
          Confirm
        </el-button>
      </span>
    </template>
    <template #uploadArea>
      <el-button type="primary">Click to upload</el-button>
    </template>
    <template #uploadTip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </wModelForm>
</template>
<style lang="scss" scoped></style>
