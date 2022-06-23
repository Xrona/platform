const defaultStore = {
  documents: [],
  currentPage: 1,
  lastPage: 1,
  sort: null,
}

function prepareDocuments(payload) {
  return payload.map((elem) => {
    return {
      id: elem?.id ?? '',
      sum: elem?.sum ?? '',
      status: elem?.unsigned ?? '',
      type: elem?.agreement ?? '',
      updatedAt: elem?.updated_at ?? '',
      statusLabel: elem?.status_label ?? '',
      createdAt: elem?.created_at ?? '',
      typeLabel: elem?.type_label ?? '',
      object: {
        id: elem.object?.id ?? '',
        name: elem.object?.name ?? '',
        address: elem.object?.address ?? '',
      },
      file: elem?.file ?? null,
    }
  })
}

export default {
  state() {
    return {
      ...defaultStore,
    }
  },

  getters: {
    documents(state) {
      return state.documents
    },

    sort(state) {
      return state.sort
    },

    currentPage(state) {
      return state.currentPage
    },

    pages(state) {
      let page = false

      if (state.currentPage < state.lastPage) {
        page = state.currentPage + 1
      }

      return page
    },
  },

  mutations: {
    setDocuments(state, payload) {
      const documents = prepareDocuments(payload)

      if (state.currentPage === 1) {
        state.documents = documents
      } else {
        state.documents = [...state.documents, ...documents]
      }
    },

    setPage(state, payload) {
      state.currentPage = payload.currentPage
      state.lastPage = payload.lastPage
    },

    setSort(state, payload) {
      state.sort = payload
    },

    clearState(state) {
      state.documents = defaultStore.documents
      state.currentPage = defaultStore.currentPage
      state.lastPage = defaultStore.lastPage
    },
  },

  actions: {
    async getDocuments({ commit }, { sort = null, page = 1 }) {
      let response = {}

      await this.$load(
        async () => {
          response = (await this.$api.document.getDocuments({ sort, page }))
            .data.data.documents
        },
        (error) => {
          console.log(error.response?.data?.errors)
        }
      )

      commit('setPage', {
        currentPage: response?.current_page ?? 1,
        lastPage: response?.last_page ?? 1,
      })

      commit('setDocuments', response.data)
    },
  },
}
