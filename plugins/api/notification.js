export default (instance) => {
  return {
    checkNew() {
      return instance.get('/user/notifications/check/new')
    },
    count() {
      return instance.get('/user/notifications/count')
    },
    switchToSent(payload) {
      return instance.patch('/user/notifications/switch/to/sent', {
        notifications_id: payload,
      })
    },
    listNotifications() {
      return instance.get('/user/list/notifications')
    },
  }
}
