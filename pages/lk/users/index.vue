<template>
  <div class="users">
    <v-row>
      <v-col class="py-0" cols="12">
        <h1>Пользователи</h1>
        <users-head />
      </v-col>
      <v-col class="py-0" cols="12">
        <users-table />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UsersTable from '@/components/users/users-table'
import UsersHead from '@/components/users/users-head'

export default {
  name: 'UsersPage',

  components: { UsersHead, UsersTable },

  middleware: 'admin',

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.getUsers().then(() => this.$nuxt.$loading.finish())
  },

  methods: {
    ...mapActions('users', ['getUsers']),
  },
}
</script>
