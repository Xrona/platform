<template>
  <v-row class="verification__content__about-company">
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="name"
        :error="errors.name"
        label="Полное наименование компании"
        placeholder="Invest"
        :is-required="true"
        input-id="verificationCompanyId"
        @blur="clearErrorMessage('companyProfile.name')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="site"
        :error="errors.site"
        label="Сайт компании"
        placeholder="example.com"
        input-id="verificationCompanySiteId"
        @blur="clearErrorMessage('companyProfile.site')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="ogrn"
        v-mask="'###############'"
        :error="errors.ogrn"
        label="ОГРН/ОГРНИП"
        placeholder="000000000000000"
        :is-required="true"
        input-id="verificationOgrnId"
        @blur="clearErrorMessage('companyProfile.ogrn')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="inn"
        v-mask="'##########'"
        :error="errors.inn"
        label="ИНН компании"
        placeholder="0000000000"
        :is-required="true"
        input-id="verificationInnId"
        @blur="clearErrorMessage('companyProfile.inn')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="kpp"
        v-mask="'#########'"
        :error="errors.kpp"
        label="КПП"
        placeholder="000000000"
        :is-required="true"
        input-id="verificationKppId"
        @blur="clearErrorMessage('companyProfile.kpp')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="okpo"
        v-mask="'#########'"
        :error="errors.okpo"
        label="ОКПО"
        placeholder="00000000"
        :is-required="true"
        input-id="verificationOkpoId"
        @blur="clearErrorMessage('companyProfile.okpo')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="registrationAddress"
        :error="errors.registrationAddress"
        label="Юридический адрес"
        placeholder="Default"
        :is-required="true"
        input-id="verificationLegalAddressId"
        @blur="clearErrorMessage('companyProfile.registrationAddress')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="checkingAccount"
        v-mask="'####################'"
        :error="errors.checkingAccount"
        label="Расчетный счет"
        placeholder="00000000000000000000"
        :is-required="true"
        input-id="verificationPaymentAccountId"
        @blur="clearErrorMessage('companyProfile.checkingAccount')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="bank"
        :error="errors.bank"
        label="Банк"
        placeholder="Сбербанк"
        :is-required="true"
        input-id="verificationBankId"
        @blur="clearErrorMessage('companyProfile.bank')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="realAddress"
        :error="errors.realAddress"
        label="Фактический адрес"
        placeholder="Default"
        :is-required="true"
        :disabled="realAddressEqual"
        input-id="verificationRealAddressId"
        @blur="clearErrorMessage('companyProfile.realAddress')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="bik"
        v-mask="'#########'"
        :error="errors.bik"
        label="БИК"
        placeholder="000000000"
        :is-required="true"
        input-id="verificationBikId"
        @blur="clearErrorMessage('companyProfile.bik')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="correspondingAccount"
        v-mask="'####################'"
        :error="errors.correspondingAccount"
        label="Корр. счёт"
        placeholder="00000000000000000000"
        :is-required="true"
        input-id="verificationCorrespondentAccountId"
        @blur="clearErrorMessage('companyProfile.correspondingAccount')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="pt-0">
      <checkbox-button
        v-model="realAddressEqual"
        title="Фактический адрес совпадает с юридическим"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TextInput from '~/components/common/text-input'
import CheckboxButton from '~/components/common/checkbox-button'
export default {
  name: 'AboutCompany',

  components: { CheckboxButton, TextInput },

  computed: {
    ...mapGetters('verification', {
      errors: 'companyErrors',
      companyProfile: 'companyProfile',
    }),

    name: {
      get() {
        return this.companyProfile?.name ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'name',
          value,
        })
      },
    },
    site: {
      get() {
        return this.companyProfile?.site ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'site',
          value,
        })
      },
    },
    bik: {
      get() {
        return this.companyProfile?.bik ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'bik',
          value,
        })
      },
    },
    ogrn: {
      get() {
        return this.companyProfile?.ogrn ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'ogrn',
          value,
        })
      },
    },
    inn: {
      get() {
        return this.companyProfile?.inn ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'inn',
          value,
        })
      },
    },
    registrationAddress: {
      get() {
        return this.companyProfile?.registrationAddress ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'registrationAddress',
          value,
        })
      },
    },
    realAddress: {
      get() {
        return this.companyProfile?.realAddress ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'realAddress',
          value,
        })
      },
    },
    realAddressEqual: {
      get() {
        return this.companyProfile?.realAddressEqual ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'realAddressEqual',
          value,
        })
      },
    },
    kpp: {
      get() {
        return this.companyProfile?.kpp ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'kpp',
          value,
        })
      },
    },
    okpo: {
      get() {
        return this.companyProfile?.okpo ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'okpo',
          value,
        })
      },
    },
    bank: {
      get() {
        return this.companyProfile?.bank ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'bank',
          value,
        })
      },
    },
    checkingAccount: {
      get() {
        return this.companyProfile?.checkingAccount ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'checkingAccount',
          value,
        })
      },
    },
    correspondingAccount: {
      get() {
        return this.companyProfile?.correspondingAccount ?? ''
      },
      set(value) {
        this.setCompanyProfile({
          prop: 'correspondingAccount',
          value,
        })
      },
    },
  },

  methods: {
    ...mapMutations('verification', ['clearErrorMessage', 'setCompanyProfile']),
  },
}
</script>
