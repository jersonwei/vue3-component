export interface menuItem {
  icon?: string
  i?:any // tsx处理后的图标
  name: string
  index: string
  children?:menuItem[]
}