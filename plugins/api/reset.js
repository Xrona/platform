export default (instance) => {
  return {
    sendUserData(payload) {
      return instance.post('/user/password/recovery/send/phone', payload)
    },
    confirmToken(payload) {
      return instance.post(
        '/user/password/recovery/token/verification',
        payload
      )
    },
    changePassword(payload) {
      return instance.patch('/user/password/recovery/change-password', payload)
    },
  }
}
