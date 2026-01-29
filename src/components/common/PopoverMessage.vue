<template>
  <n-card
    :content-style="{ padding: '0px' }"
    :footer-style="{ padding: '0px' }"
    :bordered="false"
    :segmented="true"
  >
    <div v-if="messages.length > 0">
      <div
        class="flex items-center max-w-sm p-1 mx-auto space-x-2 rounded-xl cursor-pointer"
        v-for="item of messages"
        :key="item.id"
        @click="onMarkRead(item.id)"
      >
        <div class="flex-shrink-0">
          <n-icon size="40" color="#f00">
            <NotificationsCircle />
          </n-icon>
        </div>
        <div>
          <div class="text-sm font-medium">{{ item.title }}</div>
          <n-ellipsis :line-clamp="1" class="text-gray-500">{{ item.content }}</n-ellipsis>
        </div>
      </div>
    </div>
    <n-empty v-else description="暂无消息哦~" class="pt-20 pb-20" />
    <template #footer>
      <div class="flex justify-evenly">
        <n-button type="text" @click="onClearMessage">清空消息</n-button>
        <n-button type="text" @click="onViewMore">查看更多</n-button>
      </div>
    </template>
  </n-card>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useRouter } from 'vue-router'
  import { NotificationsCircle } from '@vicons/ionicons5'
  import useMessageStore from '@/store/modules/message'
  export default defineComponent({
    name: 'PopoverMessage',
    components: { NotificationsCircle },
    emits: ['clear'],
    setup(props, { emit }) {
      const router = useRouter()
      const messageStore = useMessageStore()
      const messages = computed(() => messageStore.messages.slice(0, 6))
      function onClearMessage() {
        messageStore.clearMessages()
        emit('clear')
      }
      function onViewMore() {
        router.push('/personal/info')
      }
      function onMarkRead(id: string) {
        messageStore.markRead(id)
      }
      return {
        onClearMessage,
        onViewMore,
        onMarkRead,
        messages,
      }
    },
  })
</script>
