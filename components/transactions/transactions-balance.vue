<template>
  <div class="transactions__balance">
    <div class="transactions__balance__free">
      <h4>Свободно</h4>
      <p>{{ sum }}</p>
    </div>
    <div class="transactions__balance__reserve">
      <h4>В резерве</h4>
      <p>{{ sumReserved }}</p>
    </div>
    <div class="transactions__balance__options">
      <box-button text="Пополнить счет" class="main-button" />
      <box-button text="Вывод средств" class="outline-button" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'TransactionsBalance',

  components: { BoxButton },

  computed: {
    ...mapGetters('balance', ['balance']),

    sum() {
      return this.$priceFormat(this.balance.sum)
    },
    sumReserved() {
      return this.$priceFormat(this.balance.sumReserved)
    },
  },
}
</script>
