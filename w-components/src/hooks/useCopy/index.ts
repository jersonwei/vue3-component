import { ElMessage } from "element-plus"

export const useCopy = (text:string) => {
  let input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  console.log(input.value)
  document.execCommand('Copy')
  document.body.removeChild(input)
  ElMessage.success('复制成功')

}

export const copyToClipoard = async (text:string) => {
  await navigator.clipboard.writeText(text)
  await navigator.clipboard.readText()
  ElMessage.success('复制成功')
}