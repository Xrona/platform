export default (instance) => {
  return {
    getDocuments({ sort, page = 1 }) {
      let url = '/user/list/documents'

      url += `?page=${page}`

      if (sort !== null) {
        url += `&sortByDate=${sort}`
      }

      return instance.get(url)
    },
  }
}
