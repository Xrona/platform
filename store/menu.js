export default {
  state: () => ({
    menu: false,
  }),

  mutations: {
    setMenu(state, payload) {
      state.menu = payload
    },
  },
}
