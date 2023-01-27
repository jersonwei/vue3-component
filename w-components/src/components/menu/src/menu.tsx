import { defineComponent, PropType, useAttrs } from "vue";
import { toLine } from "../../../utils/func";
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
    }
  },
  setup(props,ctx){
    let renderMenu = (data:menuItem[])=>{
      return data.map((item:menuItem)=>{
        item.i = `el-icon-${toLine(item.icon!)}`
        // submenu插槽
        let slots = {
          title:()=>{
            return <>
              <item.i />
              <span>{item.name}</span>
            </>
          }
        }
        // 处理无限子菜单
        if (item.children && item.children.length){
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          )
        }
        // 没有子菜单项
        return <el-menu-item index={item.index}>
          <item.i />
          <span>{item.name}</span>
        </el-menu-item>
      })
    }
    return ()=>{
      console.log(props);
      let attrs = useAttrs()
      return (
        <el-menu {...attrs} defaultActive={props.defaultActive} router={props.router}>
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})