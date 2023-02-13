<script setup lang="ts">
import { FormInstance, FormOptions } from '../../components/form/src/type/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { imageUpload } from '../../api/http'
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
interface Scope {
  form: FormInstance
  model: any
}
let httpRequest = (params: any) => {
  const file = params.file,
    fileType = file.type,
    isImage = fileType.indexOf('image') !== -1,
    isLt2M = file.size / 1024 / 1024 < 2 // 这里常规检验，看项目需求而定
  if (!isImage) {
    ElMessage.error('只能上传图片格式png、jpg、gif!')
    return
  }
  if (!isLt2M) {
    ElMessage.error('只能上传图片大小小于2M')
    return
  } // 根据后台需求数据格式
  const form = new FormData() // 文件对象
  form.append('file', file) // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
  form.append('clientType', 'xxx') // 项目封装的请求方法，下面做简单介绍
  imageUpload(form)
    .then(res => {
      console.log(res)
    })
    .catch(() => {
      // xxx
    })
}
let handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}
let handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
let beforeRemove = (val: any) => {
  console.log('beforeRemove')
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`)
}
let handleExceed = (val: any) => {
  console.log('handleExceed', val)
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${val.files.length +
      val.fileList.length} totally`
  )
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
  console.log('handleBeforeUpload')
  console.log(val)
}
let form = ref()
let submitForm = (scope: Scope) => {
  console.log(scope)
  scope.form.validate(valid => {
    if (valid) {
      ElMessage.success('验证成功')
    } else {
      ElMessage.error('表单验证失败')
    }
  })
}
let resetForm = (scope: Scope) => {
  scope.form.resetFields()
}
</script>
<template>
  <wForm
    ref="form"
    :options="options"
    label-width="100px"
    @on-change="handleChange"
    @before-upload="handleBeforeUpload"
    @on-preview="handlePreview"
    @on-remove="handleRemove"
    @before-remove="beforeRemove"
    @on-success="handleSuccess"
    @on-exceed="handleExceed"
  >
    <template #uploadArea>
      <el-button type="primary">Click to upload</el-button>
    </template>
    <template #uploadTip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
    <template #action="scope">
      <el-button type="primary" @click="submitForm(scope)">提交</el-button>
      <el-button @click="resetForm(scope)">重置</el-button>
    </template>
  </wForm>
</template>
<style lang="scss" scoped>
.el-upload__tip {
  color: #ccc;
  font-size: 12px;
}
</style>
