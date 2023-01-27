export interface menuItem {
  icon?: string
  name: string
  index: string
  children?:menuItem[]
}