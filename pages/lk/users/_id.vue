<template>
  <div class="user">
    <v-row>
      <v-col class="py-0" cols="12">
        <user-head :name="fullName" />
      </v-col>
      <v-col class="py-0 user__transactions" cols="12">
        <div class="transactions-head pb-4">
          <h3>Транзакции</h3>
          <period-buttons />
        </div>
        <transactions-table />
      </v-col>
      <user-deals />
      <view-data />
      <v-col cols="12">
        <user-options
          @approve="sendStatus($options.userStatusEnum.ACCEPTED)"
          @reject="sendStatus($options.userStatusEnum.REJECTED)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TransactionsTable from '@/components/transactions/transactions-table'
import PeriodButtons from '@/components/common/period-buttons'
import UserHead from '@/components/user/user-head'
import UserOptions from '@/components/user/user-options'
import UserDeals from '@/components/user/user-deals'
import UserStatusEnum from '@/enums/user-status'
import ViewData from '@/components/user/view-data'

export default {
  name: 'UserPage',

  components: {
    ViewData,
    UserDeals,
    UserOptions,
    UserHead,
    PeriodButtons,
    TransactionsTable,
  },

  middleware: 'admin',

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.getUser(this.userId).then(() => this.$nuxt.$loading.finish())
  },

  computed: {
    ...mapGetters('user', ['user']),

    fullName() {
      return `${this.user?.role ?? ''}
      ${this.user?.surname ?? ''}
      ${this.user?.name ?? ''}
      ${this.user?.patronymic ?? ''}`
    },

    userId() {
      return this.$route.params.id
    },
  },

  beforeDestroy() {
    this.clearState()
  },

  methods: {
    ...mapActions('user', ['getUser', 'changeStatus']),
    ...mapMutations('user', ['clearState']),
    ...mapMutations('notifications', ['setNotification']),

    async sendStatus(status) {
      let notification = 'Произошла ошибка во время проведения операции'

      const result = await this.changeStatus({
        id: this.userId,
        action: status,
      })

      if (result) {
        notification = 'Опереция выполнена!'
        await this.$router.push('/users')
      }

      await this.setNotification({
        name: notification,
      })
    },
  },

  userStatusEnum: UserStatusEnum,
}
</script>
