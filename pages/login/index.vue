<template>
  <login-form />
</template>

<script>
import LoginForm from '~/components/auth/login-form'
export default {
  name: 'LoginPage',

  components: { LoginForm },

  layout: 'auth-layout',

  head() {
    return {
      title: 'Авторизация',
    }
  },
}
</script>
