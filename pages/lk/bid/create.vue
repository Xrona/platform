<template>
  <div class="bid-create">
    <v-row>
      <v-col cols="12" class="py-0">
        <h1>
          <span :class="{ 'active create': step === 0 }">Создание заявки</span>
          <template v-if="step > 0">
            <span :class="{ active: step === 1 }">Проверка данных</span>
          </template>
          <template v-if="step > 0">
            <span :class="{ active: step > 1 }">Подтверждение</span>
          </template>
        </h1>
        <bid-create-tabs :current-step="step" @selectStep="selectStep" />
      </v-col>
    </v-row>
    <template v-if="step === 0">
      <bid-form />
    </template>
    <template v-if="step === 1">
      <bid-checkup />
    </template>
    <template v-if="step === 2">
      <bid-confirmation @edit="step = 0" />
    </template>
    <step-buttons :step="step">
      <template v-if="step > 0">
        <box-button
          class="button-prev gray-button"
          text="Назад"
          @click="prevStep"
        />
      </template>
      <template v-if="step === 2">
        <box-button
          text="Подтвердить"
          class="button-next main-button"
          @click="sendCode"
        />
      </template>
      <template v-else>
        <box-button
          text="Далее"
          class="button-next main-button"
          @click="nextStep"
        />
      </template>
    </step-buttons>
    <sms-modal v-model="modal" @confirmCode="confirm" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import BidForm from '@/components/bid/bid-form'
import BidCreateTabs from '@/components/bid/bid-create-tabs'
import BidConfirmation from '@/components/bid/bid-confirmation'
import StepButtons from '@/components/common/step-buttons'
import SmsModal from '@/components/common/sms-modal'
import BidCheckup from '@/components/bid/bid-checkup'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'BidCreatePage',

  components: {
    BoxButton,
    BidCheckup,
    SmsModal,
    StepButtons,
    BidConfirmation,
    BidCreateTabs,
    BidForm,
  },

  data() {
    return {
      step: 0,
      modal: false,
    }
  },

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.loadFormData().then(() => this.$nuxt?.$loading?.finish())
  },

  beforeDestroy() {
    this.clearState()
  },

  methods: {
    ...mapActions('application', [
      'submit',
      'loadFormData',
      'sendSms',
      'validate',
    ]),
    ...mapMutations('application', ['clearState', 'setCode']),

    async nextStep() {
      if (this.step === 0) {
        this.step = await this.validate()
      } else if (this.step === 2) {
        const result = await this.submit()

        if (typeof result === 'boolean' && result) {
          await this.$router.push('/bid')
        } else {
          this.step = result
        }
      } else {
        this.step++
      }
    },

    prevStep() {
      this.step--
    },

    selectStep(idx) {
      this.step = idx
    },

    async sendCode() {
      this.modal = true

      await this.sendSms()
    },

    async confirm(value) {
      this.modal = false

      await this.setCode(value)

      const result = await this.submit()

      if (typeof result === 'number') {
        this.step = result
      } else {
        result && (await this.$router.push('/bid'))
        result && this.clearState()
      }
    },
  },
}
</script>
