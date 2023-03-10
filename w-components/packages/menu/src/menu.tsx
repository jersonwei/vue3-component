import { DefineComponent, defineComponent, PropType, useAttrs } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { defaultMenuOptions, MenuItem, MenuOptions } from '../../menu/src/type'

export default defineComponent({
  // 属性定义
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    menuOptions: {
      type: Object as PropType<MenuOptions>,
      required: false,
      default: () => ({})
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
  },

  setup (props, context) {
    console.log(props, context)

    // 合并默认的字段配置和用户传入的字段配置
    const options = {
      ...defaultMenuOptions,
      ...props.menuOptions
    }

    // 渲染图标
    const renderIcon = (icon?: string) => {
      if (!icon) {
        return null
      }
      const IconComp = (ElementPlusIconsVue as { [key: string]: DefineComponent })[icon]
      return (
        <el-icon>
          <IconComp/>
        </el-icon>
      )
    }
    let attrs = useAttrs()
    // 递归渲染菜单
    const renderMenu = (list: any[]) => {
      return list.map(item => {
        // 如果没有子菜单，使用 el-menu-item 渲染菜单项
        if (!item[options.children!] || !item[options.children!].length) {
          return (
            <el-menu-item index={item[options.code!]}>
              {renderIcon(item[options.icon!])}
              <span>{item[options.title!]}</span>
            </el-menu-item>
          )
        }

        // 有子菜单，使用 el-sub-menu 渲染子菜单
        // el-sub-menu 的插槽（title 和 default）
        const slots = {
          title: () => (
            <>
              {renderIcon(item[options.icon!])}
              <span>{item[options.title!]}</span>
            </>
          ),
          default: () => renderMenu(item[options.children!])
        }

        return <el-sub-menu index={item[options.code!]} v-slots={slots} />
      })
    }

    return () => (
      <el-menu {...context.attrs} defaultActive={props.defaultActive} router={props.router}>
        {renderMenu(props.data)}
      </el-menu>
    )
  }
})
