<template>
  <v-app>
    <v-main>
      <landing-navbar />
      <v-container>
        <Nuxt />
      </v-container>
      <main-footer />
    </v-main>
  </v-app>
</template>

<script>
import MainFooter from '@/components/common/main-footer'
import LandingNavbar from '@/components/landing/landing-navbar'
export default {
  name: 'LandingLayout',

  components: { LandingNavbar, MainFooter },
}
</script>
