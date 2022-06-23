<template>
  <div class="verification__content">
    <h1>Верификация</h1>
    <verification-tabs v-model="step" />
    <personal-data v-if="step === 0" />
    <about-company v-if="step === 1" />
    <financial-position v-if="step === 2" />
    <verification-worksheet v-if="step === 3" />
    <verification-checkup v-if="step === 4" @editData="editData" />
    <verification-confirmation v-if="step === 5" />
    <step-buttons :step="step">
      <template v-if="step > 0">
        <box-button
          class="button-prev gray-button"
          text="Назад"
          @click="step--"
        />
      </template>
      <template v-if="step === 5">
        <box-button
          class="button-next main-button"
          text="Подтвердить"
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
    <sms-modal v-model="modal" @confirmCode="complete" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import PersonalData from '~/components/verification/personal-data'
import VerificationTabs from '~/components/verification/verification-tabs'
import AboutCompany from '~/components/verification/about-company'
import StepButtons from '@/components/common/step-buttons'
import FinancialPosition from '~/components/verification/financial-position'
import VerificationWorksheet from '~/components/verification/verification-worksheet'
import VerificationConfirmation from '@/components/verification/verification-confirmation'
import VerificationCheckup from '@/components/verification/verification-checkup'
import SmsModal from '@/components/common/sms-modal'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'VerificationContent',

  components: {
    BoxButton,
    SmsModal,
    VerificationCheckup,
    VerificationConfirmation,
    VerificationWorksheet,
    FinancialPosition,
    StepButtons,
    AboutCompany,
    VerificationTabs,
    PersonalData,
  },

  data() {
    return {
      step: 0,
      modal: false,
    }
  },

  watch: {
    step(value) {
      window.scrollTo(0, 0)
    },
  },

  beforeDestroy() {
    this.clearState()
    this.clearErrors()
  },

  methods: {
    ...mapActions('verification', [
      'loadFormData',
      'validatePersonData',
      'validateCompanyData',
      'submit',
      'sendSms',
    ]),
    ...mapMutations('notifications', ['setNotification']),
    ...mapMutations('verification', [
      'clearState',
      'setConfirmation',
      'clearErrors',
    ]),

    async nextStep() {
      if (this.step === 0) {
        const result = await this.validatePersonData()

        result && this.step++
      } else if (this.step === 1) {
        const result = await this.validateCompanyData()

        result && this.step++
      } else {
        this.step++
      }
    },

    async sendCode() {
      this.modal = true

      await this.sendSms()
    },

    async complete(value) {
      this.modal = false

      await this.setConfirmation({
        prop: 'confirmationToken',
        value,
      })

      const result = await this.submit()

      console.log('verification submit res: ', result)

      if (typeof result === 'number') {
        this.step = result
      } else {
        this.clearState()
        result && (await this.$router.push('/'))

        this.setNotification({
          name: 'Заявка успешно создана',
          icon: 'diagram',
          success: true,
        })
      }
    },

    editData() {
      this.step = 0
    },
  },
}
</script>
