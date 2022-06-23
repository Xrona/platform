export default  (instance) => {
  return  {
    getDeals({page = 1, sort, filter}) {
      let url = `/user/list/deals?page=${page}`

      if (filter) {
        url += `&sortBy[]=${filter}`
      }

      if (sort) {
        url += `&sortByDate=${sort}`
      }

      return instance.get(url)
    }
  }
}
