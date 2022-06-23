const defaultState = {
  users: [],
}

export default {
  state: () => ({
    ...defaultState,
  }),

  getters: {
    users(state) {
      return state.users
    },
  },

  mutations: {
    setUsers(state, payload) {
      state.users = payload.map((user) => {
        return {
          deleted_at: user?.deleted_at ?? '',
          id: user?.id ?? '',
          phone: user?.phone ?? '',
          email: user?.email ?? '',
          status: user?.status_label ?? '',
          familyStatus: user?.user_profile?.family_status ?? '',
          gender: user?.user_profile?.gender ?? '',
          inn: user?.user_profile?.inn ?? '',
          name: user?.user_profile?.name ?? '',
          nationality: user?.user_profile?.nationality ?? '',
          passportNumber: user?.user_profile?.passport_number ?? '',
          passportSeries: user?.user_profile?.passport_series ?? '',
          patronymic: user?.user_profile?.patronymic ?? '',
          snils: user?.user_profile?.snils ?? '',
          surname: user?.user_profile?.surname ?? '',
          role: user?.role?.label ?? '',
          deals: user?.counters?.deals ?? '',
        }
      })
    },
  },

  actions: {
    async getUsers({ commit }, filters = {}) {
      let response = {}

      await this.$load(
        async () => {
          response = (await this.$api.user.users(filters)).data.data.user
        },
        (error) => {
          console.log(error)
        }
      )

      commit('setUsers', response.data)
    },
  },
}
