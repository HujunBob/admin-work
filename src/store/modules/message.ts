import { defineStore } from 'pinia'
import store from '../pinia'
import { uuid } from '@/utils'

export type MessageStatus = 0 | 1

export interface MessageItem {
  id: string
  title: string
  content: string
  status: MessageStatus
  createdAt: string
}

export interface MessagePushPayload {
  title: string
  content: string
  status?: MessageStatus
  createdAt?: string
}

const seedMessages: MessagePushPayload[] = [
  {
    title: '【总经理通知】',
    content:
      '明天【下午】有【不拘一格】课程直播，公司尝试全新直播模式，其中会直播各个部门员工的工作常态，需要全体家人的配合与支持。具体要求如下：1.、办公桌上只允许放：电脑、水杯、笔记本、笔、电话2.、座椅后背不允许挂衣服，全部放到厨子里3、直播期间，全员上身着工装外套4、直播期间请勿随意走动，文明用语，若进入直播镜头请微笑示意课程直播不仅是介绍课程，更重要的是向客户展示优行教育！[嘿哈][嘿哈][嘿哈]',
    status: 0,
  },
  {
    title: '重要通知：今天要加班，一堆bug等着修改，请全体家人们注意',
    content:
      '为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。',
    status: 0,
  },
  {
    title: '系统提示：本周培训安排',
    content: '本周三下午 3 点在会议室进行内部分享，请相关同学提前准备。',
    status: 1,
  },
  {
    title: '运维提醒：例行检查',
    content: '今晚 22:00 进行例行维护，请大家注意保存当前工作进度。',
    status: 1,
  },
  {
    title: '公告：节假日安排',
    content: '下周一为节假日，值班安排请查看邮件通知。',
    status: 1,
  },
]

function createMessage(payload: MessagePushPayload): MessageItem {
  return {
    id: uuid(),
    title: payload.title,
    content: payload.content,
    status: payload.status ?? 0,
    createdAt: payload.createdAt || new Date().toISOString(),
  }
}

function buildSeedMessages() {
  return seedMessages.map((message) => createMessage(message))
}

const useMessageStore = defineStore('message', {
  state: () => {
    return {
      messages: buildSeedMessages(),
    }
  },
  getters: {
    unreadCount(state) {
      return state.messages.filter((message) => message.status === 0).length
    },
  },
  actions: {
    pushMessage(payload: MessagePushPayload) {
      const message = createMessage(payload)
      this.messages.unshift(message)
      return message
    },
    markRead(id: string) {
      const message = this.messages.find((item) => item.id === id)
      if (message) {
        message.status = 1
      }
    },
    markAllRead() {
      this.messages.forEach((message) => {
        message.status = 1
      })
    },
    clearMessages() {
      this.messages = []
    },
  },
  presist: {
    enable: true,
    resetToState: true,
  },
})

export default useMessageStore

export function useMessageStoreContext() {
  return useMessageStore(store)
}
