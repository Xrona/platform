const defaultState = {
  objects: [],
  currentPage: 1,
  lastPage: 1,
}

function prepareObjects(payload) {
  return payload.map((elem) => {
    return {
      id: elem?.id ?? null,
      sum: {
        requested: elem.requested_sum?.toString() ?? '0',
        collected: elem.collected_sum?.toString() ?? '0',
        collectedPercent: elem.collected_percent_sum?.toString() ?? '0',
      },
      name: elem?.name ?? null,
      slug: elem?.slug ?? null,
      address: elem?.address ?? null,
      objectType: elem?.object_type ?? '',
      objectMaterial: elem?.object?.object_material ?? '',
      files: elem?.files ?? null,
      status: elem?.status ?? null,
      statusLabel: elem?.status_label ?? null,
      percent: elem?.percent?.toString() ?? '',
    }
  })
}

export default {
  state: () => ({
    ...defaultState,
  }),

  getters: {
    objects(state) {
      return state.objects
    },

    pages(state) {
      return {
        currentPage: state.currentPage,
        lastPage: state.lastPage,
      }
    },
  },

  mutations: {
    setObjects(state, payload) {
      const objects = prepareObjects(payload)

      if (state.currentPage === 1) {
        state.objects = objects
      } else {
        state.objects = [...state.objects, ...objects]
      }
    },

    setPage(state, payload) {
      state.currentPage = payload.currentPage
      state.lastPage = payload.lastPage
    },

    clearState(state) {
      state.objects = defaultState.objects
      state.currentPage = defaultState.currentPage
      state.lastPage = defaultState.lastPage
    },
  },

  actions: {
    async getObjects({ commit }, page = 1) {
      let response = {}

      await this.$load(
        async () => {
          response = (await this.$api.object.getObjects(page)).data.data.objects
        },
        (error) => {
          console.log(error)
        }
      )
      commit('setPage', {
        currentPage: response?.current_page ?? 1,
        lastPage: response?.last_page ?? 1,
      })
      commit('setObjects', response.data)
    },
  },
}
