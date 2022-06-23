export default (instance) => {
  return {
    formData() {
      return instance.get('/user/setting/profile/form')
    },

    updateAccountSettings(payload) {
      return instance.post('/user/setting/profile', {
        _method: 'PATCH',
        ...payload,
      })
    },

    updatePassword(payload) {
      return instance.patch('/user/setting/profile/password', {
        code: payload?.code ?? undefined,
        password: payload?.code,
      })
    },

    updateEmail(payload) {
      return instance.patch('/user/setting/profile/email', {
        code: payload?.code ?? undefined,
        email: payload?.email ?? undefined,
      })
    },

    updatePhone(payload) {
      return instance.path('/user/setting/profile/phone', {
        code: payload?.code ?? undefined,
        phone: payload?.phone ?? undefined,
      })
    },

    sendCode(payload) {
      return instance.post('/user/setting/profile/send/code', {
        type: payload.type,
        email: payload?.email ?? undefined,
        old_password: payload?.oldPassword ?? undefined,
        password_confirmation: payload?.passwordConfirmation ?? undefined,
        password: payload?.password ?? undefined,
        phone: payload?.phone ?? undefined,
      })
    },
  }
}
