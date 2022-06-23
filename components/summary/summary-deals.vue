<template>
  <v-col cols="12" lg="3" class="summary-deals">
    <h3>Сделки</h3>
    <div class="summary-deals__content">
      <div>
        <span>Сделки в процессе</span>
        <p>{{ dealsProgress }}</p>
      </div>
      <div>
        <span>Успешные сделки</span>
        <p>{{ dealsSuccess }}</p>
      </div>
      <div>
        <span>Отмененные сделки</span>
        <p>{{ dealsFail }}</p>
      </div>
    </div>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SummaryDeals',

  computed: {
    ...mapGetters('summary', ['deals']),

    dealsProgress() {
      return this.deals?.dealsInProgress ?? '_'
    },

    dealsSuccess() {
      return this.deals?.successfulDeals ?? '_'
    },

    dealsFail() {
      return this.deals?.failedDeals ?? '_'
    },
  },
}
</script>
