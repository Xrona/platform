<template>
  <v-col cols="12" sm="4" md="12" class="summary-balance">
    <h3>Баланс</h3>
    <div class="summary-balance__content">
      <div class="summary-balance__content__props">
        <h4>Свободно</h4>
        <p class="mb-5 mb-sm-6 mb-md-0">{{ sum }}</p>
        <h4>В резерве</h4>
        <p class="mb-6 mb-sm-3 mb-md-0">{{ sumReserved }}</p>
      </div>
      <div class="summary-balance__content__options">
        <box-button text="Пополнить счет" class="main-button" />
        <box-button text="Вывод средств" class="outline-button" />
      </div>
    </div>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'SummaryBalance',

  components: { BoxButton },

  computed: {
    ...mapGetters('summary', ['balance']),

    sum() {
      return this.$priceFormat(this.balance.sum)
    },

    sumReserved() {
      return this.$priceFormat(this.balance.sumReserved)
    },
  },
}
</script>
