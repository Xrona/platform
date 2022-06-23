import UserRoleEnum from '@/enums/user-role'

export default {
  state() {
    return {
      account: {
        surname: '',
        name: '',
        patronymic: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirmation: '',
        oldPassword: '',
        notificationEmail: false,
        avatar: null,
      },
      errors: {
        surname: null,
        name: null,
        patronymic: null,
        email: null,
        phone: null,
        password: null,
        passwordConfirmation: null,
        oldPassword: null,
        notificationEmail: null,
        avatar: null,
      },
    }
  },

  getters: {
    accountSettings(state) {
      return {
        surname: state.account?.surname ?? '',
        name: state.account?.name ?? '',
        patronymic: state.account?.patronymic ?? '',
        email: state.account?.email ?? '',
        phone: state.account?.phone ?? '',
        password: state.account?.password ?? '',
        passwordConfirmation: state.account?.passwordConfirmation ?? '',
        oldPassword: state.account?.oldPassword ?? '',
      }
    },
    userSettings(state) {
      return {
        notificationEmail: state.account.notificationEmail,
        avatar: state.account.avatar,
      }
    },
  },

  mutations: {
    setAccountSettings(state, payload) {
      if (payload) {
        state.account[payload.name] = payload.value
      }
    },

    prepareSettings(state, payload) {
      if (payload) {
        state.account = {
          ...state.account,
          surname: payload?.surname ?? '',
          name: payload?.name ?? '',
          patronymic: payload?.patronymic ?? '',
          email: payload?.email ?? '',
          phone: payload?.phone ?? '',
          password: payload?.password ?? '',
          passwordConfirmation: payload?.password_confirmation ?? '',
          oldPassword: payload?.oldPassword ?? '',
          notificationEmail: payload?.notification_email ?? false,
          avatar: payload?.avatar ?? null,
        }
      }
    },

    setErrors(state, payload) {
      if (payload) {
        state.errors = {
          surname: payload?.surname?.lastItem ?? null,
          name: payload?.name?.lastItem ?? null,
          patronymic: payload?.patronymic?.lastItem ?? null,
          email: payload?.email?.lastItem ?? null,
          phone: payload?.phone?.lastItem ?? null,
          password: payload?.password?.lastItem ?? null,
          passwordConfirmation:
            payload?.password_confirmation?.lastItem ?? null,
          oldPassword: payload?.old_password?.lastItem ?? null,
          notificationEmail: payload?.notification_email?.lastItem ?? null,
          avatar: payload?.avatar?.lastItem ?? null,
        }
      }
    },
  },

  actions: {
    async formData({ commit }) {
      await this.$load(
        async () => {
          const response = (await this.$api.setting.formData()).data?.data ?? {}

          commit('prepareSettings', response)
        },
        (error) => {
          console.log(error?.response?.data?.errors)
        }
      )
    },

    async sendCode({ commit }, payload) {
      let result = false

      await this.$load(
        async () => {
          const response = await this.$api.setting.sendCode(payload)

          result = response.data?.data?.success
        },
        (error) => {
          const errors = error?.response?.data?.errors
          commit('setErrors', errors)

          result = false
        }
      )

      return result
    },

    async updateAccountSettings({ commit, state }) {
      await this.$load(
        async () => {
          const payload = {
            avatar: state?.account?.avatar ?? undefined,
            surname: state?.account?.surname ?? undefined,
            name: state?.account?.name ?? undefined,
            patronymic: state?.account?.patronymic ?? undefined,
            notification_email: state?.account?.notificationEmail ?? undefined,
          }

          if (
            this.$auth.user.role?.id === UserRoleEnum.ADMIN ||
            this.$auth.user.role?.id === UserRoleEnum?.MODERATOR
          ) {
            payload.email = state.account?.email ?? undefined
            payload.phone = this.$case.phone(state.account?.phone) ?? undefined

            if (state.account.oldPassword) {
              payload.oldPassword = state.account?.oldPassword ?? undefined
              payload.password = state.account?.oldPassword ?? undefined
              payload.passwordConfirmation =
                state.account?.passwordConfirmation ?? undefined
            }
          }

          return (await this.$api.setting.updateAccountSettings(payload)).data
            ?.data?.success
        },
        (error) => {
          const errors = error.response?.data?.errors
          commit('setErrors', errors)

          return false
        }
      )
    },
  },
}
