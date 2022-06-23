const defaultState = {
  applications: [],
  currentPage: 1,
  lastPage: 1,
  sort: null,
  filter: null,
}

function FileDTO(file) {
  return {
    id: file.id,
    name: file?.name ?? '',
    size: file?.size ?? '',
    url: file?.full_path ?? null,
  }
}

function setImages(payload) {
  const images = []
  const egrn = []
  const cadastralPassport = []
  const technicalPassport = []
  const informationBuilding = []
  const landTaxDocument = []
  const certNoDebt = []

  payload.forEach((file) => {
    switch (file.type) {
      case 'images': {
        images.push(FileDTO(file))
        break
      }
      case 'egrn': {
        egrn.push(FileDTO(file))
        break
      }
      case 'cadastral_passport': {
        cadastralPassport.push(FileDTO(file))
        break
      }
      case 'technical_passport': {
        technicalPassport.push(FileDTO(file))
        break
      }
      case 'information_building': {
        informationBuilding.push(FileDTO(file))
        break
      }
      case 'land_tax_document': {
        landTaxDocument.push(FileDTO(file))
        break
      }
      case 'cert_no_debt': {
        certNoDebt.push(FileDTO(file))
        break
      }
    }
  })

  return {
    images,
    cadastralPassport,
    technicalPassport,
    informationBuilding,
    landTaxDocument,
    certNoDebt,
  }
}

export default {
  state: () => ({
    ...defaultState,
  }),

  getters: {
    applications(state) {
      return state.applications
    },

    pages(state) {
      return {
        currentPage: state.currentPage,
        lastPage: state.lastPage,
      }
    },
  },

  mutations: {
    setApplications(state, payload) {
      if (Array.isArray(payload)) {
        state.applications = payload.map((elem) => {
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
            status: elem.status ?? '',
            files: setImages(elem?.object?.files ?? []),
          }
        })
      }
    },

    updateApplications(state, payload) {
      state.applications = [
        ...state.applications,
        ...payload.map((elem) => {
          return {
            id: elem?.id ?? null,
            name: elem?.name ?? null,
            slug: elem?.slug ?? null,
            sum: elem?.sum ?? null,
            creditPeriod: elem?.credit_period ?? null,
            status: elem?.status ?? null,
            userId: elem?.user_id ?? null,
            createdAt: elem?.created_at ?? null,
            updatedAt: elem?.updated_at ?? null,
            statusLabel: elem?.status_label ?? null,
            address: elem?.object?.address ?? null,
            objectType: elem?.object?.object_type ?? null,
            objectMaterial: elem?.object?.object_material ?? null,
            files: elem?.object?.files ?? null,
          }
        }),
      ]
    },

    setPage(state, payload) {
      state.currentPage = payload.currentPage
      state.lastPage = payload.lastPage
    },

    clearState(state) {
      state.applications = defaultState.applications
      state.currentPage = defaultState.currentPage
      state.lastPage = defaultState.lastPage
    },
  },

  actions: {
    async getApplications({ commit }, props) {
      let response = {}

      await this.$load(
        async () => {
          response = (await this.$api.bid.getApplications(props)).data.data
            .applications
        },
        (error) => {
          console.log(error)
        }
      )

      if (props.page === 1) {
        commit('setApplications', response.data)
      } else {
        commit('updateApplications', response.data)
      }

      commit('setPage', {
        currentPage: response?.current_page ?? 1,
        lastPage: response?.last_page ?? 1,
      })
    },
  },
}
