<template>
  <div class="modal modal-invest">
    <template v-if="true">
      <h1>
        Вы инвестируете
        <span>в {{ name }}</span>
      </h1>
      <p>Вы можете инвестировать единоразовым платежом не более 100 000₽</p>
      <text-input :value="investSumNumber" @blur="setInvestSumNumber" />
      <common-slider v-model="investedSum" :min="min" :max="max" />
      <div class="modal-invest__buttons">
        <box-button text="Инвестировать" class="main-button" @click="invest" />
        <box-button text="Назад" class="outline-button" @click="closeModal" />
      </div>
    </template>
    <template v-else>
      <h1 class="insufficient-funds">
        Недостаточно денежных средств для инвестирования
      </h1>
      <p>
        Вам необходимо пополнить счет личного кабинета для инвестирования в
        объекты
      </p>
      <div class="modal-invest__buttons">
        <box-button text="Пополнить" class="main-button" @click="replenish" />
        <box-button text="Назад" class="outline-button" @click="closeModal" />
      </div>
    </template>
  </div>
</template>

<script>
import TextInput from '@/components/common/text-input'
import CommonSlider from '@/components/common/common-slider'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'InvestModal',

  components: { BoxButton, CommonSlider, TextInput },

  model: {
    prop: 'investSum',
    event: 'change',
  },

  props: {
    investSum: {
      type: [Number, undefined],
      default: undefined,
    },
    name: {
      type: String,
      default: '',
    },
    min: {
      type: [Number, undefined],
      default: undefined,
    },
    max: {
      type: [Number, undefined],
      default: undefined,
    },
  },

  computed: {
    investSumNumber() {
      return this.investSum + '₽'
    },
    investedSum: {
      get() {
        return this.investSum
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },

  methods: {
    setInvestSumNumber(event) {
      this.investedSum = Number(event.target.value.replace('₽', ''))
    },
    invest() {
      this.$emit('invest')
    },
    closeModal() {
      this.$emit('closeModal')
    },
    replenish() {
      this.$emit('replenish')
    },
  },
}
</script>
