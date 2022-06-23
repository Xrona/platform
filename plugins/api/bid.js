export default (instance) => {
  function prepareFiles(files) {
    if (files !== null && files?.length > 0) {
      return files.map((file) => file.file)
    }

    return undefined
  }

  return {
    formData() {
      return instance.get('/user/application/form-data')
    },

    sendSms() {
      return instance.post('/user/application/send/sms')
    },

    validate(payload) {
      const ctx = instance.getContext()

      const data = ctx.$objectToFormData({
        address: payload?.address ?? undefined,
        description: payload?.description ?? undefined,
        sum: payload?.sum ?? undefined,
        credit_period: payload?.creditPeriod ?? undefined,
        material: payload?.material ?? undefined,
        floors_count: payload?.floorsCount ?? undefined,
        house_area: payload?.houseArea ?? undefined,
        land_area: payload?.landArea ?? undefined,
        object_type: payload?.objectType ?? undefined,
        images: prepareFiles(payload?.images) ?? undefined,
        egrn: prepareFiles(payload?.egrn) ?? undefined,
        cadastral_passport:
          prepareFiles(payload?.cadastralPassport) ?? undefined,
        technical_passport:
          prepareFiles(payload?.technicalPassport) ?? undefined,
        information_building:
          prepareFiles(payload?.informationBuilding) ?? undefined,
        land_tax_document: prepareFiles(payload?.landTaxDocument) ?? undefined,
        cert_no_debt: prepareFiles(payload?.certNoDebt) ?? undefined,
      })

      return instance.post('/user/application/create-validate', data)
    },

    submit(payload) {
      const ctx = instance.getContext()

      const data = ctx.$objectToFormData({
        address: payload?.address ?? undefined,
        description: payload?.description ?? undefined,
        sum: payload?.sum ?? undefined,
        credit_period: payload?.creditPeriod ?? undefined,
        material: payload?.material ?? undefined,
        floors_count: payload?.floorsCount ?? undefined,
        house_area: payload?.houseArea ?? undefined,
        land_area: payload?.landArea ?? undefined,
        object_type: payload?.objectType ?? undefined,
        images: prepareFiles(payload?.images) ?? undefined,
        egrn: prepareFiles(payload?.egrn) ?? undefined,
        cadastral_passport:
          prepareFiles(payload?.cadastralPassport) ?? undefined,
        technical_passport:
          prepareFiles(payload?.technicalPassport) ?? undefined,
        information_building:
          prepareFiles(payload?.informationBuilding) ?? undefined,
        land_tax_document: prepareFiles(payload?.landTaxDocument) ?? undefined,
        cert_no_debt: prepareFiles(payload?.certNoDebt) ?? undefined,
        operator_and_investor_agreement:
          payload?.operatorAndInvestorAgreement ?? undefined,
        personal_agreement: payload?.personalAgreement ?? undefined,
        confirm_resident_rf: payload?.confirmResidentRf ?? undefined,
        code: payload?.code ?? undefined,
      })

      return instance.post('/user/application/create', data)
    },

    getApplications({ page, sort, filter }) {
      let url = `/user/list/applications?page=${page}`

      if (filter) {
        url += `&sortBy[]=${filter}`
      }

      if (sort) {
        url += `&sortByDate=${sort}`
      }

      return instance.get(url)
    },

    getApplication(id) {
      return instance.get(`/user/application/${id}`)
    },

    update(id, payload) {
      const ctx = instance.getContext()

      const data = ctx.$objectToFormData({
        address: payload.address,
        sum: payload.sum,
        credit_period: payload.creditPeriod,
        object_type: payload.objectType,
        material: payload.material,
        floors_count: payload.floorsCount,
        land_area: payload.landArea,
        house_area: payload.houseArea,
        description: payload.description,
        images: payload.images,
        egrn: payload.egrn,
        cadastral_passport: payload.cadastralPassport,
        technical_passport: payload.technicalPassport,
        information_building: payload.informationBuilding,
        land_tax_document: payload.landTaxDocument,
        cert_no_debt: payload.certNoDebt,
        _method: 'PUT',
      })

      return instance.post(`/user/application/${id}/update`, data)
    },
  }
}
