const defaultStore = {
  payload: {
    data: {
      address: '',
      description: '',
      sum: '',
      creditPeriod: '',
      material: null,
      floorsCount: null,
      houseArea: '',
      landArea: '',
      objectType: null,
      images: null,
      egrn: null,
      cadastralPassport: null,
      technicalPassport: null,
      presentation: null,
      informationBuilding: null,
      landTaxDocument: null,
      certNoDebt: null,
      code: '',
    },
    confirm: {
      operatorAndInvestorAgreement: 0,
      personalAgreement: 0,
      confirmResidentRf: 0,
    },
  },
  errors: {
    address: null,
    description: null,
    sum: null,
    creditPeriod: null,
    material: null,
    floorsCount: null,
    houseArea: null,
    landArea: null,
    objectType: null,
    images: null,
    egrn: null,
    cadastralPassport: null,
    technicalPassport: null,
    presentation: null,
    informationBuilding: null,
    landTaxDocument: null,
    certNoDebt: null,
    operatorAndInvestorAgreement: null,
    personalAgreement: null,
    confirmResidentRf: null,
  },
  objectTypes: [],
  objectMaterials: [],
}

function FileDTO(file) {
  return {
    id: file.id,
    name: file?.name ?? '',
    size: file?.size ?? '',
    url: file?.full_path ?? null,
  }
}

export default {
  state: () => ({
    ...defaultStore,
  }),

  getters: {
    data(state) {
      return state.payload.data
    },

    confirm(state) {
      return {
        operatorAndInvestorAgreement:
          !!state.payload.confirm.operatorAndInvestorAgreement,
        personalAgreement: !!state.payload.confirm.personalAgreement,
        confirmResidentRf: !!state.payload.confirm.confirmResidentRf,
      }
    },

    code(state) {
      return state.payload.data.code
    },

    errors(state) {
      return state.errors
    },
  },

  mutations: {
    setPayload(state, payload) {
      state.payload.data = {
        address: payload?.object?.address ?? '',
        description: payload?.object?.description ?? '',
        sum: payload?.sum ?? '',
        creditPeriod: payload?.credit_period ?? '',
        material: payload?.object?.object_material_id ?? null,
        floorsCount: payload?.object?.floors_count ?? null,
        houseArea: payload?.object?.house_area ?? '',
        landArea: payload?.object?.land_area ?? '',
        objectType: payload?.object?.object_type_id ?? null,
      }
    },

    setImages(state, payload) {
      const images = []
      const egrn = []
      const cadastralPassport = []
      const technicalPassport = []
      const informationBuilding = []
      const landTaxDocument = []
      const certNoDebt = []
      let presentation = null

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
          case 'presentation': {
            presentation = FileDTO(file)
            break
          }
        }
      })

      state.payload.data = {
        ...state.payload.data,
        images,
        cadastralPassport,
        technicalPassport,
        informationBuilding,
        landTaxDocument,
        certNoDebt,
        presentation,
      }
    },

    setErrors(state, payload) {
      state.errors = {
        address: payload?.address?.lastItem ?? null,
        description: payload?.description?.lastItem ?? null,
        sum: payload?.sum?.lastItem ?? null,
        creditPeriod: payload?.credit_period?.lastItem ?? null,
        material: payload?.material?.lastItem ?? null,
        floorsCount: payload?.floors_count?.lastItem ?? null,
        houseArea: payload?.house_area?.lastItem ?? null,
        landArea: payload?.land_area?.lastItem ?? null,
        objectType: payload?.object_type?.lastItem ?? null,
        images: payload?.images?.lastItem ?? null,
        egrn: payload?.egrn?.lastItem ?? null,
        cadastralPassport: payload?.cadastral_passport?.lastItem ?? null,
        technicalPassport: payload?.technical_passport?.lastItem ?? null,
        presentation: payload?.presentation?.lastItem ?? null,
        informationBuilding: payload?.information_building?.lastItem ?? null,
        landTaxDocument: payload?.land_tax_document?.lastItem ?? null,
        certNoDebt: payload?.cert_no_debt?.lastItem ?? null,
        operatorAndInvestorAgreement:
          payload?.operator_and_investor_agreement?.lastItem ?? null,
        personalAgreement: payload?.personal_agreement?.lastItem ?? null,
        confirmResidentRf: payload?.confirm_resident_rf?.lastItem ?? null,
      }
    },

    clearErrors(state) {
      state.errors = { ...defaultStore.errors }
    },

    clearErrorMessage(state, name) {
      state.errors[name] = null
    },

    setReferenceBooks(state, payload) {
      state.objectMaterials = payload.objectMaterials
      state.objectTypes = payload.objectTypes
    },

    setDataProperty(state, payload) {
      state.payload.data[payload.prop] = payload.value
    },

    setCode(state, payload) {
      state.payload.data.code = payload
    },

    setConfirmProperty(state, payload) {
      state.payload.confirm[payload.prop] = payload.value ? 1 : 0
    },

    clearState(state) {
      state.payload = defaultStore.payload
      state.errors = defaultStore.errors
    },
  },

  actions: {
    async loadFormData({ commit }) {
      await this.$api.bid.formData().then((response) => {
        const data = response.data.data
        const objectTypes = data.object_types
        const objectMaterials = data.object_materials

        commit('setReferenceBooks', {
          objectTypes,
          objectMaterials,
        })
      })
    },

    async sendSms() {
      let result = true

      await this.$load(
        () => this.$api.bid.sendSms(),
        () => {
          result = false
        }
      )

      return result
    },

    async submit({ state, commit }) {
      commit('clearErrors')

      let result = true
      const payload = {
        ...state.payload.data,
        ...state.payload.confirm,
      }

      await this.$load(
        () => {
          return this.$api.bid.submit(payload)
        },
        (error) => {
          const errors = error.response.data.errors

          commit('setErrors', errors)

          const errorKeys = Object.keys(errors)

          if (
            errorKeys.includes('operator_and_investor_agreement') ||
            errorKeys.includes('personal_agreement') ||
            errorKeys.includes('confirm_resident_rf')
          ) {
            result = 2
          } else {
            result = 0
          }
        }
      )

      return result
    },

    async validate({ commit, state }) {
      commit('clearErrors')

      let result = 1
      const payload = {
        ...state.payload.data,
      }

      await this.$load(
        () => {
          return this.$api.bid.validate(payload)
        },
        (error) => {
          const errors = error.response.data.errors

          commit('setErrors', errors)

          result = 0
        }
      )

      return result
    },

    async getApplication({ commit }, id) {
      let response = null

      await this.$load(
        async () => {
          response = (await this.$api.bid.getApplication(id)).data.data
            .application
        },
        (error) => {
          console.log(error)
        }
      )

      if (response) {
        commit('setPayload', response)
        commit('setImages', response?.object?.files ?? [])
      }
    },

    async update({ state, commit }, id) {
      commit('clearErrors')

      let result = true

      await this.$load(
        () => {
          return this.$api.bid.update(id, state.payload.data)
        },
        (error) => {
          const errors = error.response.data.errors

          commit('setErrors', errors)

          result = false
        }
      )

      return result
    },
  },
}
