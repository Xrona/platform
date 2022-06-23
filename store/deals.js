function prepareDeals(payload) {
  if (Array.isArray(payload)) {
    return payload.map((elem) => {
      return {
        id: elem.id ?? '',
        name: elem.name ?? '',
        slug: elem.slug ?? '',
        houseArea: elem.house_area ?? '',
        floorsCount: elem.floors_count ?? '',
        address: elem.address ?? '',
        sum: {
          requested: elem.requested_sum?.toString() ?? '0',
          collected: elem.collected_sum?.toString() ?? '0',
          collectedPercent: elem.collected_percent_sum?.toString() ?? '0',
        },
        objectType: elem.object_type ?? '',
        investAmount: elem.invested_sum === 0 ? '0' : elem.invested_sum ?? null,
        status: elem?.status ?? null,
      }
    })
  }

  return []
}

const defaultState = {
  deals: [],
  filter: null,
  sort: null,
  currentPage: 1,
  lastPage: 1,
}

export default {
  state() {
    return {
      ...defaultState,
    }
  },
  getters: {
    deals(state) {
      return state.deals
    },

    options(state) {
      return {
        filter: state.filter,
        sort: state.sort,
      }
    },

    pages(state) {
      return state.currentPage < state.lastPage
    },

    currentPage(state) {
      return state.currentPage
    },
  },

  mutations: {
    setDeals(state, payload) {
      state.deals = prepareDeals(payload)
    },

    updateDeals(state, payload) {
      const deals = prepareDeals(payload)

      state.deals = [...state.deals, ...deals]
    },
    setOptions(state, payload) {
      state.filter = payload.filter
      state.sort = payload.sort
    },

    setPage(state, payload) {
      state.currentPage = payload.currentPage
      state.lastPage = payload.lastPage
    },

    clearState(state) {
      state.deals = []
      state.filter = null
      state.sort = null
      state.currentPage = 1
      state.lastPage = 1
    },
  },

  actions: {
    async getDeals({ state, commit }, page = 1) {
      let response = {}
      const props = {
        sort: state.sort,
        filter: state.filter,
        page,
      }

      await this.$load(
        async () => {
          response = (await this.$api.deal.getDeals(props)).data.data.deals
        },
        (error) => {
          console.log(error)
        }
      )

      if (props.page === 1) {
        commit('setDeals', response.data)
      } else {
        commit('updateDeals', response.data)
      }

      commit('setPage', {
        currentPage: response?.current_page ?? 1,
        lastPage: response?.last_page ?? 1,
      })
    },
  },
}
