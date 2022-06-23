<template>
  <v-app>
    <v-main>
      <div class="auth-layout">
        <Nuxt />
      </div>
      <auth-footer />
    </v-main>
  </v-app>
</template>

<script>
import AuthFooter from '~/components/common/main-footer'
export default {
  name: 'AuthLayout',

  components: { AuthFooter },
}
</script>
