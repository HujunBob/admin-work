<template>
  <div class="message-push-anchor"></div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
  import { useNotification } from 'naive-ui'
  import useMessageStore from '@/store/modules/message'
  import { MESSAGE_PUSH_EVENT, MessagePushEventPayload } from '@/utils/messagePush'

  export default defineComponent({
    name: 'MessagePush',
    setup() {
      const messageStore = useMessageStore()
      const notification = useNotification()

      const handleMessagePush = (payload: MessagePushEventPayload) => {
        if (!payload.title || !payload.content) {
          return
        }
        const message = messageStore.pushMessage({
          title: payload.title,
          content: payload.content,
          status: payload.status,
          createdAt: payload.createdAt,
        })
        const meta = payload.meta || new Date(message.createdAt).toLocaleString()
        const options = {
          title: message.title,
          content: message.content,
          meta,
        }
        switch (payload.type) {
          case 'success':
            notification.success(options)
            break
          case 'warning':
            notification.warning(options)
            break
          case 'error':
            notification.error(options)
            break
          default:
            notification.info(options)
            break
        }
      }

      const onPushEvent = (event: Event) => {
        const detail = (event as CustomEvent<MessagePushEventPayload>).detail
        if (detail) {
          handleMessagePush(detail)
        }
      }

      onMounted(() => {
        window.addEventListener(MESSAGE_PUSH_EVENT, onPushEvent)
      })

      onBeforeUnmount(() => {
        window.removeEventListener(MESSAGE_PUSH_EVENT, onPushEvent)
      })

      return {}
    },
  })
</script>
