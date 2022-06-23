<template>
  <v-row class="verification__content__financial-position">
    <v-col cols="12" class="py-0">
      <h3>
        Информация об источниках происхождения денежных средств/имущества*
      </h3>
    </v-col>
    <v-col cols="12" md="6" lg="4" class="py-0">
      <checkbox-button
        v-model="mainIncome"
        title="Доход по основному месту работы"
      />
      <checkbox-button
        v-model="activity"
        title="Предпринимательская деятельность"
      />
      <checkbox-button
        v-model="dividends"
        title="Дивиденды от участия в коммерческих проектах"
      />
      <checkbox-button
        v-model="previousAccumulations"
        title="Накопления прошлых лет"
      />
      <checkbox-button
        v-model="borrowedFunds"
        title="Заемные средства, кредиты"
      />
      <checkbox-button
        v-model="workPartTimeIncome"
        title="Доход от работы по совместительству"
      />
    </v-col>
    <v-col cols="12" md="6" lg="5" class="pt-0 pb-5 financial-position-sm">
      <checkbox-button
        v-model="transactionsIncome"
        title="Доход от совершения сделок с ценными бумагами"
      />
      <checkbox-button
        v-model="depositsIncome"
        title="Доход от вкладов, открытых на мое имя"
      />
      <checkbox-button
        v-model="saleIncome"
        title="Доходы от реализации имущества"
      />
      <checkbox-button v-model="pension" title="Пенсия" />
      <checkbox-button v-model="other" title="Другое" />
    </v-col>
  </v-row>
</template>

<script>
import CheckboxButton from '~/components/common/checkbox-button'
export default {
  name: 'FinancialPosition',

  components: { CheckboxButton },

  data() {
    return {
      mainIncome: false,
      activity: false,
      dividends: false,
      previousAccumulations: false,
      borrowedFunds: false,
      workPartTimeIncome: false,
      transactionsIncome: false,
      depositsIncome: false,
      saleIncome: false,
      pension: false,
      other: false,
    }
  },
}
</script>
