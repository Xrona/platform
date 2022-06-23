<template>
  <v-row class="verification__content__checkup">
    <v-col cols="12" class="py-0">
      <h3>Проверьте введеные персональные данные</h3>
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="surname" label="Фамилия" />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="name" label="Имя" />
    </v-col>
    <v-col cols="0" md="4" class="d-none d-md-block" />
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="patronymic" label="Отчество" />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="nationality" label="Гражданство" />
    </v-col>
    <v-col cols="0" md="4" class="d-none d-md-block" />

    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="snils" label="СНИЛС" />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="passport" label="Серия и номер паспорта" />
    </v-col>
    <v-col cols="3" class="d-none d-md-block" />
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="familyStatus" label="Семейное положение" />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <disabled-field :value="inn" label="ИНН" />
    </v-col>
    <v-col cols="3" class="d-none d-md-block"></v-col>
    <v-col cols="12" sm="4" lg="2" class="py-0">
      <box-button
        class="verification__content__checkup__edit main-button"
        text="Редактировать"
        @click="editData"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import DisabledField from '@/components/common/disabled-field'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'VerificationCheckup',

  components: { BoxButton, DisabledField },

  computed: {
    ...mapGetters('verification', [
      'userProfile',
      'nationalities',
      'familyStatuses',
    ]),

    nationality() {
      const currentNationality =
        this.nationalities.find(
          (elem) => elem.value === this.userProfile?.nationality
        ) ?? null

      if (currentNationality) {
        return currentNationality.label
      }

      return ''
    },
    familyStatus() {
      const currentFamilyStatus =
        this.familyStatuses.find(
          (elem) => elem.value === this.userProfile?.familyStatus
        ) ?? null

      if (currentFamilyStatus) {
        return currentFamilyStatus.label
      }

      return ''
    },
    surname() {
      return this.userProfile?.surname ?? ''
    },
    name() {
      return this.userProfile?.name ?? ''
    },
    patronymic() {
      return this.userProfile?.patronymic ?? ''
    },
    snils() {
      return this.userProfile?.snils ?? ''
    },
    passport() {
      return this.userProfile?.passport ?? ''
    },
    inn() {
      return this.userProfile?.inn ?? ''
    },
  },

  methods: {
    editData() {
      this.$emit('editData')
    },
  },
}
</script>
