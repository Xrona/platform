<template>
  <v-col cols="12" class="summary-transactions">
    <div class="summary-transactions__head">
      <h3>Последние транзакции</h3>
      <period-buttons v-model="period" :only-dropdown="true" />
    </div>
    <transactions-table :transactions="transactions" />
    <template v-if="havePages">
      <box-button
        text="Показать больше"
        class="outline-button summary-transactions__button"
        @click="nextPage"
      />
    </template>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TransactionsTable from '@/components/transactions/transactions-table'
import BoxButton from '@/components/common/box-button'
import PeriodButtons from '@/components/common/period-buttons'
export default {
  name: 'SummaryTransactions',

  components: { PeriodButtons, BoxButton, TransactionsTable },

  computed: {
    ...mapGetters('transactions', [
      'transactions',
      'sortByDate',
      'havePages',
      'currentPage',
    ]),

    period: {
      get() {
        return this.sortByDate
      },
      set(value) {
        this.getTransactions({ sort: value })
      },
    },
  },

  methods: {
    ...mapActions('transactions', ['getTransactions']),

    async nextPage() {
      await this.getTransactions({
        sort: this.sortByDate,
        page: this.currentPage + 1,
      })
    },
  },
}
</script>
