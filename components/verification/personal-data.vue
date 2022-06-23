<template>
  <v-row class="verification__content__personal-data">
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="surname"
        placeholder="Фамилия"
        input-id="verificationSurname"
        label="Фамилия"
        :is-required="true"
        :error="errors.surname"
        @blur="clearErrorMessage('userProfile.surname')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="name"
        placeholder="Имя"
        label="Имя"
        input-id="verificationName"
        :is-required="true"
        :error="errors.name"
        @blur="clearErrorMessage('userProfile.name')"
      />
    </v-col>
    <v-col cols="0" md="4" class="d-none d-md-block" />
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="patronymic"
        placeholder="Отчество"
        label="Отчество"
        :is-required="true"
        input-id="verificationLastname"
        :error="errors.patronymic"
        @blur="clearErrorMessage('userProfile.patronymic')"
      />
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <input-dropdown
        :value="nationality"
        label="Гражданство"
        :is-required="true"
        :error="errors.nationality"
      >
        <template #menu="{ className, close }">
          <template v-for="item in nationalities">
            <button
              :key="item.label"
              :class="className"
              @click="setNationality(item.value, close)"
            >
              {{ item.label }}
            </button>
          </template>
        </template>
      </input-dropdown>
    </v-col>
    <v-col cols="0" md="4" class="d-none d-md-block" />

    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="snils"
        v-mask="'###-###-### ##'"
        placeholder="000-000-000 00"
        label="СНИЛС"
        input-id="verificationSnils"
        :error="errors.snils"
        @blur="clearErrorMessage('userProfile.snils')"
      />
    </v-col>

    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="passport"
        v-mask="'####-######'"
        placeholder="0000-000000"
        label="Серия и номер паспорта"
        :is-required="true"
        input-id="verificationPassport"
        :error="errors.passport"
        @blur="clearErrorMessage('userProfile.passport')"
      />
    </v-col>
    <v-col cols="3" class="d-none d-md-block" />
    <v-col cols="12" sm="6" md="4" class="py-0">
      <input-dropdown
        :value="familyStatus"
        label="Семейное положение"
        :is-required="true"
        :error="errors.familyStatus"
      >
        <template #menu="{ className, close }">
          <template v-for="elem in familyStatuses">
            <button
              :key="elem.label"
              :class="className"
              @click="setFamilyStatus(elem.value, close)"
            >
              {{ elem.label }}
            </button>
          </template>
        </template>
      </input-dropdown>
    </v-col>
    <v-col cols="12" sm="6" md="4" class="py-0">
      <text-input
        v-model="inn"
        v-mask="'############'"
        placeholder="000000000000"
        label="ИНН"
        input-id="verificationInn"
        :is-required="true"
        :error="errors.inn"
        @blur="clearErrorMessage('userProfile.inn')"
      />
    </v-col>
    <v-col
      cols="12"
      md="10"
      lg="8"
      class="verification__content__personal-data__passport-scan py-0"
    >
      <h3>Загрузка документов</h3>
      <div>
        <div>
          <p>Изображение разворота <span>с фотографией</span></p>
          <file-input
            v-model="userPassport"
            :error="imageErrors.userPassport"
            @load="clearErrorMessage('images.userPassport')"
          />
        </div>
        <div>
          <p>Изображение разворота <span>с действующей пропиской</span></p>
          <file-input
            v-model="userPassportActiveSubscription"
            :error="imageErrors.userPassportActiveSubscription"
            @load="clearErrorMessage('images.userPassportActiveSubscription')"
          />
        </div>
      </div>
    </v-col>
    <v-col cols="4" class="d-none d-md-block" />
    <v-col cols="12" md="4" class="py-0">
      <checkbox-button
        v-model="isCompany"
        title="Зарегистрироваться как компания"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TextInput from '~/components/common/text-input'
import CheckboxButton from '~/components/common/checkbox-button'
import FileInput from '@/components/common/file-input'
import InputDropdown from '@/components/common/input-dropdown'

export default {
  name: 'PersonalData',

  components: {
    InputDropdown,
    FileInput,
    CheckboxButton,
    TextInput,
  },

  computed: {
    ...mapGetters('verification', {
      errors: 'personalErrors',
      images: 'personImages',
      getIsCompany: 'isCompany',
      userProfile: 'userProfile',
      familyStatuses: 'familyStatuses',
      nationalities: 'nationalities',
      imageErrors: 'imageErrors',
    }),

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

    surname: {
      get() {
        return this.userProfile?.surname ?? ''
      },
      set(value) {
        this.setUserProfile({
          prop: 'surname',
          value,
        })
      },
    },
    name: {
      get() {
        return this.userProfile?.name ?? ''
      },
      set(value) {
        this.setUserProfile({
          prop: 'name',
          value,
        })
      },
    },
    patronymic: {
      get() {
        return this.userProfile?.patronymic ?? ''
      },
      set(value) {
        this.setUserProfile({
          prop: 'patronymic',
          value,
        })
      },
    },
    snils: {
      get() {
        return this.userProfile?.snils ?? ''
      },
      set(value) {
        this.setUserProfile({
          prop: 'snils',
          value,
        })
      },
    },
    passport: {
      get() {
        return this.userProfile?.passport ?? ''
      },
      set(value) {
        this.setUserProfile({
          prop: 'passport',
          value,
        })
      },
    },

    inn: {
      get() {
        return this.userProfile?.inn ?? ''
      },
      set(value) {
        this.setUserProfile({
          prop: 'inn',
          value,
        })
      },
    },
    isCompany: {
      get() {
        return !!this.getIsCompany ?? false
      },
      set(value) {
        this.setIsCompany(value)
      },
    },
    userPassport: {
      get() {
        return this.images.userPassport
      },
      set(value) {
        this.clearErrorMessage('images.userPassport')

        this.setUserPassport(value)
      },
    },
    userPassportActiveSubscription: {
      get() {
        return this.images.userPassportActiveSubscription
      },
      set(value) {
        this.clearErrorMessage('images.userPassportActiveSubscription')

        this.setUserPassportActiveSubscription(value)
      },
    },
  },

  methods: {
    ...mapMutations('verification', [
      'clearErrorMessage',
      'setUserProfile',
      'setIsCompany',
      'setUserPassport',
      'setUserPassportActiveSubscription',
    ]),

    setNationality(value, fn = null) {
      this.clearErrorMessage('userProfile.nationality')
      this.setUserProfile({
        prop: 'nationality',
        value,
      })

      if (fn) {
        fn()
      }
    },

    setFamilyStatus(value, fn = null) {
      this.clearErrorMessage('userProfile.familyStatus')

      this.setUserProfile({
        prop: 'familyStatus',
        value,
      })

      if (fn) {
        fn()
      }
    },
  },
}
</script>
