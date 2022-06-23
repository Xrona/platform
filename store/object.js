export default {
  state() {
    return {
      data: {
        id: null,
        name: '',
        slug: '',
        tags: [],
        objectTypeId: null,
        objectMaterialId: null,
        houseArea: '',
        landArea: '',
        landAreaConversion: '',
        floorsCount: '',
        address: '',
        description: '',
        objectType: '',
        objectMaterial: '',
        status: '',
        statusLabel: '',
        requestedSum: 0,
        collectedSum: 0,
        collectedPercentSum: 0,
        percent: 0,
        userId: null,
        files: [],
        fundingPeriod: 0,
        creditPeriod: 0,
      },
      objectMaterials: [],
      objectTypes: [],
      errors: {
        name: null,
        objectTypeId: null,
        objectMaterialId: null,
        houseArea: null,
        landArea: null,
        floorsCount: null,
        address: null,
        description: null,
        status: null,
        requestedSum: null,
        percent: null,
        files: [],
        fundingPeriod: null,
        creditPeriod: null,
      },
    }
  },

  getters: {
    options(state) {
      return state.data
    },
    objectMaterials(state) {
      return state.objectMaterials
    },
    objectTypes(state) {
      return state.objectTypes
    },
    errors(state) {
      return state.errors
    },
  },

  mutations: {
    setObject(state, payload) {
      state.data = {
        id: payload?.id ?? null,
        name: payload?.name ?? '',
        slug: payload?.slug ?? '',
        tags: payload?.tags ?? [],
        objectTypeId: payload?.object_type_id ?? null,
        objectMaterialId: payload?.object_material_id ?? null,
        houseArea: payload?.house_area ?? 0,
        landArea: payload?.land_area ?? 0,
        landAreaConversion: `${payload?.land_area_conversion_value ?? ''} ${
          payload?.land_area_conversion_unit ?? ''
        }`,
        floorsCount: payload?.floors_count ?? 0,
        address: payload?.address ?? '',
        description: payload?.description ?? '',
        objectType: payload?.object_type ?? '',
        objectMaterial: payload?.object_material ?? '',
        status: payload?.status ?? '',
        statusLabel: payload?.status_label ?? '',
        requestedSum: payload?.requested_sum ?? 0,
        collectedSum: payload?.collected_sum ?? 0,
        collectedPercentSum: payload?.collected_percent_sum ?? 0,
        percent: payload?.sum ?? 0,
        userId: payload?.user_id ?? 0,
        files: payload?.files ?? [],
      }
    },

    setProperties(state, payload) {
      state.data = {
        ...state.data,
        ...payload,
      }
    },

    setObjectMaterials(state, payload) {
      state.objectMaterials = [...payload]
    },
    setObjectTypes(state, payload) {
      state.objectTypes = [...payload]
    },
    setErrors(state, errors) {
      state.errors = {
        name: errors.name?.lastItem ?? null,
        objectTypeId: errors.object_type?.lastItem ?? null,
        objectMaterialId: errors.object_material?.lastItem ?? null,
        houseArea: errors.house_area?.lastItem ?? null,
        landArea: errors.land_area?.lastItem ?? null,
        floorsCount: errors.floors_count?.lastItem ?? null,
        address: errors.address?.lastItem ?? null,
        description: errors.description?.lastItem ?? null,
        status: errors.status?.lastItem ?? null,
        requestedSum: errors.sum?.lastItem ?? null,
        percent: errors.percent?.lastItem ?? null,
        files: errors.files?.lastItem ?? null,
        fundingPeriod: errors.funding_period?.lastItem ?? null,
        creditPeriod: errors.credit_period?.lastItem ?? null,
      }
    },
  },

  actions: {
    async getObject({ commit }, id) {
      await this.$load(
        async () => {
          const response = (await this.$api.object.getObject(id)).data.data
          await commit('setObject', response ?? {})

          const objectLists = (await this.$api.bid.formData()).data.data ?? {}
          await commit(
            'setObjectMaterials',
            objectLists?.object_materials ?? []
          )
          await commit('setObjectTypes', objectLists?.object_types ?? [])
        },
        (error) => {
          console.log(error)
        }
      )
    },

    async updateObject({ state, commit }, payload) {
      await commit('setProperties', payload)
      let response = true

      await this.$load(
        () => this.$api.object.update(state.data.id, state.data),
        (error) => {
          response = false
          const errors = error.response?.data?.errors

          commit('setErrors', errors)
        }
      )

      return response
    },
  },
}
