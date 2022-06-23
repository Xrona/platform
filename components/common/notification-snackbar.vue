<template>
  <div class="notification-snackbar">
    <template v-for="(notification, idx) in showedNotifications">
      <div
        :key="`${notification.name}-${notification.id}`"
        :ref="`notificationItem${notification.id}`"
        class="notification-snackbar__item"
        :style="`--index: ${idx}`"
      >
        <div
          class="notification-item__icon"
          :class="
            notification.success ? 'success-notification' : 'error-notification'
          "
        >
          <svg-icon :name="notification.icon" width="16" height="16" />
        </div>
        <div class="notification-item__text">
          {{ notification.name }}
        </div>
      </div>
    </template>
    <transition name="slide">
      <template v-if="showedNotifications.length > 0">
        <nuxt-link
          class="box-button outline-button"
          :style="`--buttonIndex: ${showedNotifications.length}`"
          to="/lk/notifications"
        >
          Перейти к уведомлениям
        </nuxt-link>
      </template>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'NotificationSnackbar',

  data() {
    return {
      notifications: [],
      notificationIntervalId: null,
    }
  },

  computed: {
    ...mapState('notifications', ['showedNotifications', 'interval']),
  },

  watch: {
    showedNotifications(value) {
      value.forEach((item) => {
        this.removeNotificationHandler(item?.id)
        this.notifications = [...this.notifications, item]

        this.$nextTick(() => {
          setTimeout(() => {
            const elem = this.$refs[`notificationItem${item?.id}`][0]
            elem?.classList?.add('show')
          }, 1)
        })
      })
    },
  },

  mounted() {
    if (!this.interval) {
      this.intervalHandler(true)
      this.notificationInterval()
    }
  },
  beforeDestroy() {
    window.clearInterval(this.notificationIntervalId)
    this.intervalHandler(false)
  },

  methods: {
    ...mapActions('notifications', ['checkNotifications']),
    ...mapMutations('notifications', ['intervalHandler']),

    removeNotificationHandler(id) {
      setTimeout(() => {
        this.$refs[`notificationItem${id}`][0].classList.remove('show')
      }, 19500)
      // setTimeout(() => {
      //   this.removeNotification(id)
      //   this.showedNotifications = [...this.notifications]
      // }, 20000)
    },

    notificationInterval() {
      this.notificationIntervalId = window.setInterval(
        this.checkNotifications,
        20000
      )
    },
  },
}
</script>
