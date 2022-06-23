<template>
  <v-row class="verification__content__confirmation">
    <v-col cols="12" class="py-0">
      <h3>
        Для подтверждения персональных данных и выбранных ниже пунктов Вам будет
        отправлен СМС-код
      </h3>
      <checkbox-button
        v-model="investPlatformAgreement"
        title="Подтверждаю, что ознакомился и согласен с Правилами инвестиционной платформы"
        :error="confirmationErrors.investPlatformAgreement"
      />
      <checkbox-button
        v-model="operatorAndInvestorAgreement"
        title="Подтверждаю, что ознакомился и принимаю Договор оказания услуг по содействию между Оператором и Инвестором"
        :error="confirmationErrors.operatorAndInvestorAgreement"
      />
      <checkbox-button
        v-model="personalAgreement"
        title="Согласен на Обработку персональных данных"
        :error="confirmationErrors.personalAgreement"
      />
      <checkbox-button
        v-model="confirmResidentRf"
        title="Подтверждаю, что являюсь налоговым резидентом РФ и не являюсь российским или иностранным должностным лицом, действую для собственной выгоды и не имею бенефициаров"
        :error="confirmationErrors.confirmResidentRf"
      />
      <p>Код будет выслан на номер <span>+7 (924) 836 87-86</span></p>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CheckboxButton from '@/components/common/checkbox-button'

export default {
  name: 'VerificationConfirmation',

  components: { CheckboxButton },

  computed: {
    ...mapGetters('verification', ['confirmation', 'confirmationErrors']),

    investPlatformAgreement: {
      get() {
        return this.confirmation?.investPlatformAgreement ?? ''
      },
      set(value) {
        this.setConfirmation({
          prop: 'investPlatformAgreement',
          value,
        })
      },
    },
    operatorAndInvestorAgreement: {
      get() {
        return this.confirmation?.operatorAndInvestorAgreement ?? ''
      },
      set(value) {
        this.setConfirmation({
          prop: 'operatorAndInvestorAgreement',
          value,
        })
      },
    },
    confirmResidentRf: {
      get() {
        return this.confirmation?.confirmResidentRf ?? ''
      },
      set(value) {
        this.setConfirmation({
          prop: 'confirmResidentRf',
          value,
        })
      },
    },
    personalAgreement: {
      get() {
        return this.confirmation?.personalAgreement ?? ''
      },
      set(value) {
        this.setConfirmation({
          prop: 'personalAgreement',
          value,
        })
      },
    },
  },

  methods: {
    ...mapMutations('verification', ['setConfirmation']),
  },
}
</script>
