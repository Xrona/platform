export default (instance) => {
  return {
    info() {
      return instance.get('/users/me')
    },

    login(payload) {
      return instance.post('/auth/login', payload)
    },

    register(payload) {
      return instance.post('/user/registration', payload)
    },

    confirmPhone(payload) {
      return instance.get(`/user/confirm/phone/${payload}`)
    },

    registerComplete(payload) {
      return instance.post('/user/registration/complete', payload)
    },

    users({ roles, search }) {
      return instance.get('/user/list/users', {
        params: {
          roles: roles ?? undefined,
          search: search ?? undefined,
        },
      })
    },

    user(id) {
      return instance.get(`/user/${id}`)
    },

    changeStatus(payload) {
      return instance.post('/user/verification/change-status', payload)
    },

    balance(id) {
      return instance.get(`user/${id}/balance`)
    },

    updateProfile(payload, id) {
      const keys = Object.keys(payload)
      const user = Object.assign({}, payload)

      keys.forEach((key) => {
        user[key] = user[key] === '' ? undefined : user[key]
      })

      return instance.post(`user/update/profile/${id}`, {
        _method: 'PUT',
        ...user,
      })
    },

    permissions() {
      return instance.post('user/update/profile/form-data')
    },

    userFormData() {
      return instance.get('user/admin/user/form/register')
    },

    registerUser(payload) {
      return instance.post('user/admin/user/register', payload)
    },
  }
}
