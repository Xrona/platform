<template>
  <div class="default-layout">
    <v-app>
      <v-main>
        <notification-snackbar v-if="!$route.path.includes('notifications')" />
        <left-sidebar />
        <v-container>
          <main-navbar />
          <Nuxt />
        </v-container>
        <main-footer />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import LeftSidebar from '~/components/common/left-sidebar'
import MainFooter from '~/components/common/main-footer'
import MainNavbar from '@/components/common/main-navbar'
import NotificationSnackbar from '@/components/common/notification-snackbar'
export default {
  name: 'DefaultLayout',

  components: {
    NotificationSnackbar,
    MainNavbar,
    MainFooter,
    LeftSidebar,
  },
}
</script>
