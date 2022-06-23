<template>
  <v-row class="bid-create__confirmation">
    <v-col cols="12" class="py-0">
      <h3>
        Для подтверждения персональных данных и выбранных ниже пунктов Вам будет
        отправлен СМС-код
      </h3>
      <checkbox-button
        v-model="personalAgreement"
        title="Подтверждаю, временный текст персональные данные"
      />
      <template v-if="errors.personalAgreement">
        <div class="error-validation">
          <svg-icon name="error" />
          <span>{{ errors.personalAgreement }}</span>
        </div>
      </template>
      <checkbox-button
        v-model="confirmResidentRf"
        title="Подтверждаю, что являюсь налоговым резидентом РФ и не являюсь российским или иностранным должностным лицом, действую для собственной выгоды и не имею бенефициаров"
      />
      <template v-if="errors.confirmResidentRf">
        <div class="error-validation">
          <svg-icon name="error" />
          <span>{{ errors.confirmResidentRf }}</span>
        </div>
      </template>
      <checkbox-button
        v-model="operatorAndInvestorAgreement"
        title="Подтверждаю, что ознакомился и принимаю Договор оказания услуг по содействию между Оператором и Инвестором"
      />
      <template v-if="errors.operatorAndInvestorAgreement">
        <div class="error-validation">
          <svg-icon name="error" />
          <span>{{ errors.operatorAndInvestorAgreement }}</span>
        </div>
      </template>
      <p>Код будет выслан на номер <span> +7 (924) 836 87-86 </span></p>
      <button class="bid-create__confirmation__edit" @click="edit">
        Редактировать
      </button>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CheckboxButton from '~/components/common/checkbox-button'
export default {
  name: 'BidConfirmation',

  components: { CheckboxButton },

  computed: {
    ...mapGetters('application', ['confirm', 'errors']),

    operatorAndInvestorAgreement: {
      get() {
        return this.confirm.operatorAndInvestorAgreement
      },
      set(value) {
        this.setConfirmProperty({
          prop: 'operatorAndInvestorAgreement',
          value: value ? 1 : 0,
        })
      },
    },
    personalAgreement: {
      get() {
        return this.confirm.personalAgreement
      },
      set(value) {
        this.setConfirmProperty({
          prop: 'personalAgreement',
          value: value ? 1 : 0,
        })
      },
    },
    confirmResidentRf: {
      get() {
        return this.confirm.confirmResidentRf
      },
      set(value) {
        this.setConfirmProperty({
          prop: 'confirmResidentRf',
          value: value ? 1 : 0,
        })
      },
    },
  },

  methods: {
    ...mapMutations('application', ['setConfirmProperty']),

    edit() {
      this.$emit('edit')
    },
  },
}
</script>
