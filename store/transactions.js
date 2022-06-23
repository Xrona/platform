export default {
  state() {
    return {
      transactions: [],
      page: 1,
      lastPage: 1,
      sortByDate: null,
    }
  },

  getters: {
    transactions(state) {
      return state.transactions
    },

    havePages(state) {
      return state.page < state.lastPage
    },

    sortByDate(state) {
      return state.sortByDate
    },

    currentPage(state) {
      return state.page
    },
  },

  mutations: {
    setTransactions(state, payload) {
      if (Array.isArray(payload)) {
        const transactions = payload.map((item) => {
          return {
            id: item.id,
            balanceFromType: item.balance_from_type,
            balanceFrom: {
              id: item.balance_from.id,
              ownerId: item.balance_from.owner_id,
            },
            balanceToType: item.balance_to_type,
            balanceTo: {
              id: item.balance_to.id,
              ownerId: item.balance_to.owner_id,
            },
            sum: item.sum,
            status: item.status,
            statusLabel: item.status_label,
            date: item.updated_at,
            file: item.file,
          }
        })

        if (state.page > 1) {
          state.transactions = [...state.transactions, ...transactions]
        } else {
          state.transactions = transactions
        }
      }
    },

    setPage(state, payload) {
      state.page = payload.current_page
      state.lastPage = payload.last_page
    },

    setSort(state, payload) {
      state.sortByDate = payload
    },
  },

  actions: {
    async getTransactions({ commit, state }, { sort = null, page = 1 }) {
      commit('setSort', sort)

      let response = {}
      const payload = {
        page,
        sortByDate: state.sortByDate,
      }

      await this.$load(
        async () =>
          (response = (
            await this.$api.transaction.transactions(payload)
          ).data.data.transactions),
        (error) => console.log(error.response)
      )

      commit('setPage', response)
      commit('setTransactions', response.data)
    },
  },
}
