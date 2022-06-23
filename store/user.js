const user = {
  id: '',
  phone: '',
  email: '',
  status: '',
  role: '',
  isCompany: '',
  name: '',
  surname: '',
  patronymic: '',
  passport: {
    series: '',
    number: '',
  },
  nationality: '',
  inn: '',
  snils: '',
  underReview: false,
  permissions: [],
  oldPassword: '',
  password: '',
  confirmPassword: '',
}

const userErrors = {
  id: false,
  phone: false,
  email: false,
  status: false,
  role: false,
  isCompany: false,
  name: false,
  surname: false,
  patronymic: false,
  passport: false,
  nationality: false,
  inn: false,
  snils: false,
  underReview: false,
  permissions: false,
}

export default {
  state() {
    return {
      user: { ...user },
      userErrors: { ...userErrors },
      permissions: [],
    }
  },

  getters: {
    user(state) {
      return state.user
    },

    userErrors(state) {
      return state.userErrors
    },

    permissions(state) {
      return state.permissions
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user = {
        id: payload?.id ?? '',
        phone: payload?.phone ?? '',
        email: payload?.email ?? '',
        status: payload?.status_label ?? '',
        role: payload?.role?.label ?? '',
        isCompany: payload?.is_company ?? '',
        name: payload.user_profile?.name ?? '',
        surname: payload.user_profile?.surname ?? '',
        patronymic: payload.user_profile?.patronymic ?? '',
        passport: {
          series: payload.user_profile?.passport?.series ?? '',
          number: payload.user_profile?.passport?.number ?? '',
        },
        nationality: payload.user_profile?.nationality ?? '',
        inn: payload.user_profile?.inn ?? '',
        snils: payload.user_profile?.snils ?? '',
        underReview: payload.under_review ?? false,
        permissions: payload.permissions ?? [],
        oldPassword: '',
        password: '',
        confirmPassword: '',
      }
    },

    setProp(state, { prop, value }) {
      state.user[prop] = value
      state.userErrors[prop] = null
    },

    setPermission(state, payload) {
      const oldPermission = [...state.permissions]

      state.permissions = oldPermission.map((elem) => {
        return {
          ...elem,
          value: payload.id === elem.id ? payload.value : elem.value,
        }
      })
    },

    presetPermissions(state, permissionsList) {
      const userPermissions = state.permissions

      state.permissions = permissionsList.map((permission) => {
        return {
          id: permission.id,
          label: permission.name,
          value: !!userPermissions.find((item) => item.id === permission.id),
        }
      })
    },

    setErrors(state, payload) {
      state.userErrors = {
        id: payload?.id?.[0] ?? false,
        phone: payload?.phone?.[0] ?? false,
        email: payload?.email?.[0] ?? false,
        status: payload?.status?.[0] ?? false,
        role: payload?.role?.[0] ?? false,
        isCompany: payload?.is_company?.[0] ?? false,
        name: payload?.name?.[0] ?? false,
        surname: payload?.surname?.[0] ?? false,
        patronymic: payload?.patronymic?.[0] ?? false,
        passport: payload?.passport?.[0] ?? false,
        nationality: payload?.nationality?.[0] ?? false,
        inn: payload?.inn?.[0] ?? false,
        snils: payload?.snils?.[0] ?? false,
        underReview: payload?.under_review?.[0] ?? false,
        permissions: payload?.permissions?.[0] ?? false,
      }
    },

    clearState(state) {
      state.user = { ...user }
      state.permissions = []
    },
  },

  actions: {
    async getUser({ commit }, userId) {
      await this.$load(
        async () => {
          const response = (await this.$api.user.user(userId)).data?.data?.user

          commit('setUser', response)
        },
        (error) => {
          console.log(error)
        }
      )
    },

    async getPermissions({ commit }) {
      await this.$load(
        async () => {
          const permissionsList =
            (await this.$api.user.permissions()).data?.data?.permissions ?? []

          commit('presetPermissions', permissionsList)
        },
        (err) => console.log(err.response.errors)
      )
    },

    async getUserFormData({ commit }) {
      let response = {}
      await this.$load(
        async () => {
          response = (await this.$api.user.userFormData()).data.data

          commit('presetPermissions', response.permissions)
        },
        (err) => console.log(err.response.errors)
      )

      return response?.roles ?? []
    },

    async changeStatus({ commit }, payload) {
      let response = true

      await this.$load(
        async () => {
          await this.$api.user.changeStatus(payload)
        },
        (error) => {
          response = false
          console.log(error.response)
        }
      )

      return response
    },

    async registerUser({ state, commit }) {
      const user = { ...state.user }

      user.permissions = state.permissions
        .filter((permission) => permission.value)
        .map((permission) => permission.id)
      user.phone = this.$case.phone(user.phone)

      let result = true

      await this.$load(
        async () => {
          await this.$api.user.registerUser(user)
        },
        (err) => {
          result = false
          commit('setErrors', err.response?.data?.errors ?? {})
        }
      )

      return result
    },

    async updateSettingsByAdmin({ state, commit }, id) {
      let result = true
      const user = { ...state.user }

      user.permissions = state.permissions
        .filter((permission) => permission.value)
        .map((permission) => permission.id)

      user.phone = this.$case.phone(user.phone)

      user.user_profile = {
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
      }

      await this.$load(
        async () => {
          await this.$api.user.updateProfile(user, id)
        },
        (err) => {
          result = false
          console.log(err.response?.data?.errors)
          commit('setErrors', err.response?.data?.errors ?? {})
        }
      )

      return result
    },
  },
}
