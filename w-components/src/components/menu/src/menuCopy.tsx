import { DefineComponent, defineComponent, PropType, useAttrs } from "vue";
import { toLine } from "../../../utils/func";
import * as Icons from '@element-plus/icons-vue'
import { menuItem } from "./type";

export default defineComponent({
  props:{
    data: {
      type: Array as PropType<menuItem[]>,
      required: true
    },
    // 默认选中项
    defaultActive: {
      type: String,
      default: ''
    },
    // 路由模式
    router: {
      type: Boolean,
      default: false
    },
    // 菜单标题的键名
    name: {
      type: String,
      default: 'name'
    },
    // 菜单标识的键名
    index: {
      type: String,
      default: 'index'
    },
    // 菜单图标的键名
    icon: {
      type: String,
      default: 'icon'
    },
    // 菜单子菜单的键名
    children: {
      type: String,
      default: 'children'
    },
  },
  setup(props,ctx){
     // 渲染图标
     let renderIcon = (icon?: string) => {
      if (!icon) {
        return null
      }
      const IconComp = (Icons as { [key: string]: DefineComponent })[icon]
      console.log(IconComp);
      
      return (
        <el-icon>
          <IconComp/>
        </el-icon>
      )
    }
    let renderMenu = (data:menuItem[])=>{
      return data.map((item:any)=>{
        console.log(item[props.icon]);
        
        // item.i = (Icons as any)[item[props.icon!]]
        item.i = `el-icon-${toLine(item[props.icon])}`
        console.log(item.i,item[props.icon!]);
        
        // submenu插槽
        let slots = {
          title:()=>{
            return <>
                <el-icon>
          <item.i />
        </el-icon>
              <span>{item[props.name]}</span>
            </>
          }
          // default: ()=> renderMenu(item[props.children])
        }
        // 处理无限子菜单
        if (item[props.children] && item[props.children].length){
          return (
            <el-sub-menu index={item[props.index]} v-slots={slots}>
               {renderMenu(item[props.children])}
            </el-sub-menu>
          )
        }
        // 没有子菜单项
        return (
        <el-menu-item index={item[props.index]}>
          {item[props.icon]}
          {renderIcon(item[props.icon!])}
          <span>{item[props.name]}</span>
        </el-menu-item>
        )
      })
    }
    let attrs = useAttrs()
    return ()=>{
      console.log(props);
      return (
        <el-menu {...attrs} defaultActive={props.defaultActive} router={props.router}>
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})