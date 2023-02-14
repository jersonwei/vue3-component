<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import { EventClickArg } from '@fullcalendar/core'
import { PropType, ref } from 'vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { EventItem } from './types'
import { co } from '@fullcalendar/core/internal-common'
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
let eventGuid = 0
let currentEvents = ref<any[]>([])
let todayStr = ref<string>(new Date().toISOString().replace(/T.*$/, '')) // YYYY-MM-DD of today
const createEventId = () => {
  return String(eventGuid++)
}
const INITIAL_EVENTS = ref([
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr.value
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr.value + 'T12:00:00'
  }
])

const handleEventClick = (clickInfo: any) => {
  if (
    confirm(
      `Are you sure you want to delete the event '${clickInfo.event.title}'`
    )
  ) {
    clickInfo.event.remove()
  }
}
const handleDateSelect = (selectInfo: any) => {
  let title = prompt('Please enter a new title for your event')
  let calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })
  }
}
const handleEvents = (events: any) => {
  currentEvents.value = events
}
const handleWeekendsToggle = () => {
  calendarOptions.value.weekends = !calendarOptions.value.weekends // update a property
}
let calendarOptions = ref<any>()
let emits = defineEmits(['date-click', 'event-click'])
calendarOptions.value = {
  // 日历插件
  plugins: [dayGridPlugin, interactionPlugin],
  // 视图模式
  initialView: props.initialView,
  initialEvents: INITIAL_EVENTS,
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
  displayEventEnd: true,
  eventContent: props.eventContent,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents
}
</script>
<template>
  <div class="demo-app">
    <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            :checked="calendarOptions.weekends"
            @change="handleWeekendsToggle"
          />
          toggle weekends
        </label>
      </div>
      <div class="demo-app-sidebar-section">
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
