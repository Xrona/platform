export default {
  state() {
    return {
      balance: {
        id: null,
        sum: 0,
        sumReserved: 0,
      },
    }
  },

  getters: {
    balance(state) {
      return state.balance
    },
  },

  mutations: {
    setBalance(state, payload) {
      state.balance = {
        id: payload.id,
        sum: payload.sum,
        sumReserved: payload.sum_reserved,
      }
    },
  },

  actions: {
    async getBalance({ commit }) {
      let response = {}

      await this.$load(
        async () => {
          response = (
            await this.$api.user.balance(this.$auth.user.user_profile.id)
          ).data.data.balance
        },
        (error) => console.log(error.response.error)
      )

      commit('setBalance', response)
    },
  },
}
