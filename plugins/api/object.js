export default (instance) => {
  return {
    getObjects(page = 1) {
      return instance.get(`/user/list/objects?page=${page}`)
    },

    getObject(id) {
      return instance.get(`/user/object/${id}`)
    },

    update(id, payload) {
      return instance.post(`/user/object/${id}/update`, {
        _method: 'PUT',
        name: payload?.name ?? undefined,
        object_type: payload?.objectTypeId ?? undefined,
        material: payload?.objectMaterialId ?? undefined,
        house_area: payload?.houseArea ?? undefined,
        land_area: payload?.landArea ?? undefined,
        floors_count: payload?.floorsCount ?? undefined,
        address: payload?.address ?? undefined,
        description: payload?.description ?? undefined,
        status: payload?.status ?? undefined,
        sum: payload?.requestedSum ?? undefined,
        percent: payload?.percent ?? undefined,
        credit_period: payload?.creditPeriod ?? undefined,
        funding_period: payload?.fundingPeriod ?? undefined,
        images: [],
        files: [],
      })
    },

    downloadPresentation(id) {
      return instance.get(`/user/object/${id}/download/presentation`)
    },
  }
}
