export default {
  methods: {
    async fetchHandler(callback) {
      this.$nuxt?.$loading?.start()

      await callback().then(() => {
        this.$nuxt?.$loading?.finish()
      })
    },
  },
}
