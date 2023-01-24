export  interface ListItem {
  avatar?: string
  title?: string
  desc?: string
  time?: string
  tag?:string
  tagType?: 'success' | 'warning' | 'danger' | 'info'
}

export interface ListOptions {
  title?:string
  content?: ListItem[]
}

export interface ActionOptions {
  text: string
  icon: string
}

export interface clickItemObj {
  item:ListOptions
  idx:number
}

export interface clickActionObj {
  item:ActionOptions
  idx:number
}