export default (instance) => {
  return {
    transactions(params) {
      return instance.get('/user/list/transactions', {
        params,
      })
    },
  }
}
