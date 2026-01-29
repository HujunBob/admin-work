import type { MessagePushPayload } from '@/store/modules/message'

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface MessagePushEventPayload extends MessagePushPayload {
  type?: NotificationType
  meta?: string
}

export const MESSAGE_PUSH_EVENT = 'vaw-message-push'

export function dispatchMessagePush(payload: MessagePushEventPayload) {
  if (typeof window === 'undefined') {
    return
  }
  window.dispatchEvent(new CustomEvent<MessagePushEventPayload>(MESSAGE_PUSH_EVENT, { detail: payload }))
}
