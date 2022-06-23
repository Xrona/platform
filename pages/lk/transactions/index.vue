<template>
  <div class="transactions">
    <v-row>
      <v-col class="py-0" cols="12" md="12" sm="8">
        <h2>Баланс</h2>
        <transactions-balance />
      </v-col>
      <v-col class="py-0" cols="12">
        <div class="transactions__head">
          <h2>Транзакции</h2>
          <period-buttons v-model="sort" />
        </div>
        <transactions-table :transactions="transactions" />
      </v-col>
      <template v-if="havePages">
        <v-col class="py-0" cols="12">
          <box-button
            class="transactions__more-button"
            text="Показать больше"
            @click="getMoreTransactions"
          />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TransactionsBalance from '@/components/transactions/transactions-balance'
import TransactionsTable from '@/components/transactions/transactions-table'
import BoxButton from '@/components/common/box-button'
import PeriodButtons from '@/components/common/period-buttons'

export default {
  name: 'TransactionsPage',

  components: {
    PeriodButtons,
    BoxButton,
    TransactionsTable,
    TransactionsBalance,
  },

  async fetch() {
    this.$nuxt?.$loading?.start()

    await this.getBalance().then(async () => {
      await this.getTransactions({}).then(() => this.$nuxt.$loading.finish())
    })
  },

  computed: {
    ...mapGetters('transactions', ['havePages', 'transactions', 'sortByDate']),

    sort: {
      get() {
        return this.sortByDate
      },
      set(sort) {
        this.getTransactions({ sort })
      },
    },
  },

  methods: {
    ...mapActions('balance', ['getBalance']),
    ...mapActions('transactions', ['getTransactions']),
    ...mapActions('transactions', ['getTransactions']),

    getMoreTransactions() {},
  },
}
</script>
