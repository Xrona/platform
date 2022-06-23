<template>
  <transition name="loading">
    <div v-if="loading" class="loading-page"></div>
  </transition>
</template>

<script>
export default {
  name: 'LoadingBar',

  data() {
    return {
      loading: false,
    }
  },

  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background-color: white;
}
</style>
