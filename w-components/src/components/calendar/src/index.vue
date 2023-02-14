<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import { Calendar, EventClickArg } from '@fullcalendar/core'
import { onMounted, PropType, ref } from 'vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EventItem } from './types'
let props = defineProps({
  // 日历显示的语言
  local: {
    type: String,
    default: 'zh-cn'
  },
  // 视图模式
  initialView: {
    type: String,
    default: 'dayGridMonth'
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        prevYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月'
      }
    }
  },
  // 头部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next'
      }
    }
  },
  // 底部工具栏
  footerToolbar: {
    type: Object
  },
  // 日历事件
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => []
  },
  // 自定义渲染内容方法
  eventContent: {
    type: Function
  }
})
let calendarOptions = ref<any>()
let emits = defineEmits(['date-click', 'event-click'])
calendarOptions.value = {
  // 日历插件
  plugins: [dayGridPlugin, interactionPlugin],
  // 视图模式
  initialView: props.initialView,
  locale: props.local,
  buttonText: props.buttonText,
  headerToolbar: props.headerToolbar,
  footerToolbar: props.footerToolbar,
  eventSources: [
    {
      events (e: any, callback: any) {
        if (props.events.length) callback(props.events)
        else callback([])
      }
    }
  ],
  dateClick (info: DateClickArg) {
    emits('date-click', info)
  },
  eventClick (info: EventClickArg) {
    emits('event-click', info)
  },
  displayEventEnd: true,
  eventContent: props.eventContent
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
<style lang="scss" scoped></style>
