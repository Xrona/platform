<template>
  <div class="form-complete">
    <box-button text="В кабинет" @click="goLogin" />
  </div>
</template>

<script>
import BoxButton from '~/components/common/box-button'
export default {
  name: 'RegisterFormComplete',

  components: { BoxButton },

  methods: {
    goLogin() {
      this.$router.push('/login/login')
    },
  },
}
</script>
