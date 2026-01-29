<template>
  <n-notification-provider>
    <n-message-provider>
      <MessagePush />
      <router-view />
    </n-message-provider>
  </n-notification-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MessagePush from '@/components/MessagePush.vue'

  export default defineComponent({
    name: 'App',
    components: { MessagePush },
  })
</script>
