export default {
  state: () => ({
    notifications: [],
    showedNotifications: [],
    count: 0,
    interval: false,
  }),

  mutations: {
    setCount(state, payload) {
      state.count = payload
    },
    intervalHandler(state, payload) {
      state.interval = payload
    },
    setShowedNotification(state, payload) {
      // const lastItem = state.showedNotifications?.lastItem ?? null

      state.showedNotifications.push({
        name: payload.message,
        status: payload?.status ?? '',
        success: payload?.success ?? '',
        icon: payload?.success ? payload?.icon ?? '' : 'notification-error',
        date: payload?.date ?? '',
        id: payload?.id,
      })
    },

    removeNotification(state, id) {
      state.showedNotifications = state.showedNotifications.filter(
        (elem) => elem.id !== id
      )
    },

    setNotifications(state, payload) {
      state.notifications = payload.map((notification) => {
        return {
          id: notification.id,
          userId: notification?.user_id,
          name: notification?.message,
          status: notification?.status,
          notifier: notification?.notifier,
          notificationType: notification?.notification_type,
          date: this.$dateFormat(notification.created_at),
        }
      })
    },
  },

  actions: {
    async checkNotifications({ commit }) {
      let response = false
      await this.$load(
        async () =>
          (response =
            (await this.$api.notification.checkNew()).data?.data?.success ??
            false),
        (error) => console.log(error?.response?.data?.errors)
      )

      if (response) {
        let notifications = []
        let count = 0

        await this.$load(
          async () => {
            const response =
              (await this.$api.notification.count())?.data?.data ?? {}

            notifications = response?.notifications?.slice(0, 5) ?? []
            count = response?.count ?? 0

            if (notifications.length > 0) {
              const notificationsIds = notifications.map(
                (notification) => notification.id
              )

              await this.$api.notification.switchToSent(notificationsIds)

              notifications.forEach((notification) => {
                commit('setShowedNotification', notification)

                setTimeout(
                  () => commit('removeNotification', notification.id),
                  20000
                )
              })
            }

            commit('setCount', count)
          },
          (error) => console.log(error.response?.data?.errors)
        )
      }
    },

    async listNotifications({ commit }) {
      await this.$load(
        async () => {
          const response = (await this.$api.notification.listNotifications())
            .data?.data?.notifications

          commit('setNotifications', response?.data ?? [])
        },
        (error) => {
          console.log(error?.response?.data?.errors)
        }
      )
    },
  },
}
