<template>
  <div class="summary">
    <template v-if="isGuest">
      <summary-guest />
    </template>
    <h1>Сводка</h1>
    <v-row class="summary__sm">
      <summary-balance />
      <summary-tickers />
      <summary-profit />
      <summary-deals />
      <summary-transactions />
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SummaryBalance from '@/components/summary/summary-balance'
import SummaryTickers from '@/components/summary/summary-tickers'
import SummaryProfit from '@/components/summary/summary-profit'
import SummaryDeals from '@/components/summary/summary-deals'
import SummaryTransactions from '@/components/summary/summary-transactions'
import UserRoleEnum from '@/enums/user-role'
import SummaryGuest from '@/components/summary/summary-guest'
export default {
  name: 'DashboardPage',

  components: {
    SummaryGuest,
    SummaryTransactions,
    SummaryDeals,
    SummaryProfit,
    SummaryTickers,
    SummaryBalance,
  },

  async fetch() {
    this.$nuxt?.$loading?.start()

    await this.getSummary().then(
      async () =>
        await this.getTransactions({}).then(() =>
          this.$nuxt?.$loading?.finish()
        )
    )
  },

  computed: {
    isGuest() {
      const user = this?.$auth?.user

      return user?.role?.id === UserRoleEnum.GUEST
    },
  },

  methods: {
    ...mapActions('summary', ['getSummary']),
    ...mapActions('transactions', ['getTransactions']),
  },
}
</script>
