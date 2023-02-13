import axios from 'axios'
export const imageUpload=params=>{
  const url='https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  // 根据后台需求的数据格式确定headers
  return axios.post(url, params, {
  headers:{"content-type":"multipart/form-data"}
  })
  }