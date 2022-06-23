<template>
  <div class="settings__account">
    <v-row>
      <v-col class="py-0" cols="12" sm="6" md="4" lg="3">
        <text-input
          v-model="surname"
          input-id="firstName"
          label="Фамлия"
          placeholder="Фамилия"
          :disabled="!isNullFocus"
        />
      </v-col>
      <v-col class="py-0" cols="12" sm="6" md="4" lg="3">
        <text-input
          v-model="name"
          input-id="middleName"
          label="Имя"
          placeholder="Имя"
          :disabled="!isNullFocus"
        />
      </v-col>
      <v-col class="py-0" cols="12" sm="6" md="4" lg="3">
        <text-input
          v-model="patronymic"
          input-id="lastName"
          label="Отчество"
          placeholder="Отчество"
          :disabled="!isNullFocus"
        />
      </v-col>
      <v-col
        sm="6"
        lg="3"
        class="py-0 d-none d-sm-block d-md-none d-lg-block"
      />
      <v-col class="py-0" cols="12" sm="6" md="4" lg="3">
        <text-input
          v-model="phone"
          v-mask="'+7 (###) ### ##-##'"
          input-id="userPhone"
          label="Телефон"
          placeholder="Телефон"
          :disabled="!isPhoneFocus"
          @focus="focusPhone"
        />
      </v-col>
      <v-col class="py-0" cols="12" sm="6" md="4" lg="3">
        <text-input
          v-model="email"
          input-id="userEmail"
          label="Email"
          placeholder="Email"
          :disabled="!isEmailFocus"
          @focus="focusEmail"
        />
      </v-col>
      <v-col md="4" lg="6" class="py-0 d-none d-md-block" />
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="oldPassword"
          input-id="oldPassword"
          label="Старый пароль"
          placeholder="Введите текущий пароль"
          input-type="password"
          :disabled="!isPasswordFocus"
          @focus="focusPassword"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" class="py-0">
        <text-input
          v-model="password"
          input-id="newPassword"
          label="Новый пароль"
          placeholder="Введите новый пароль"
          input-type="password"
          :disabled="!isPasswordFocus"
          @focus="focusPassword"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" class="py-0">
        <text-input
          v-model="passwordConfirmation"
          input-id="repeatNewPassword"
          label="Повторите пароль"
          placeholder="Повторите новый пароль"
          input-type="password"
          :disabled="!isPasswordFocus"
          @focus="focusPassword"
        />
      </v-col>
    </v-row>
    <template v-if="isUser">
      <settings-user :disabled="!isNullFocus" />
    </template>
    <v-row>
      <v-col cols="12" md="3" class="py-0">
        <box-button
          class="main-button settings__button-save"
          text="Сохранить"
          @click="saveAccountSettings"
        />
      </v-col>
    </v-row>
    <sms-modal v-model="modal" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TextInput from '~/components/common/text-input'
import UserRoleEnum from '@/enums/user-role'
import BoxButton from '@/components/common/box-button'
import SettingsUser from '@/components/settings/settings-user'
import TypeSettingsEnum from '@/enums/typeSettings'
import SmsModal from '@/components/common/sms-modal'
export default {
  name: 'SettingsAccount',

  components: { SmsModal, SettingsUser, BoxButton, TextInput },

  data() {
    return {
      modal: false,
      typeSettings: null,
    }
  },

  computed: {
    ...mapGetters('settings', ['accountSettings']),

    surname: {
      get() {
        return this.accountSettings.surname
      },
      set(value) {
        this.setAccountSettings({
          name: 'surname',
          value,
        })
      },
    },

    name: {
      get() {
        return this.accountSettings.name
      },
      set(value) {
        this.setAccountSettings({
          name: 'name',
          value,
        })
      },
    },

    patronymic: {
      get() {
        return this.accountSettings.patronymic
      },
      set(value) {
        this.setAccountSettings({
          name: 'patronymic',
          value,
        })
      },
    },

    email: {
      get() {
        return this.accountSettings.email
      },
      set(value) {
        this.setAccountSettings({
          name: 'email',
          value,
        })
      },
    },

    phone: {
      get() {
        return this.accountSettings.phone
      },
      set(value) {
        this.setAccountSettings({
          name: 'phone',
          value: value.replace(' ', ''),
        })
      },
    },

    password: {
      get() {
        return this.accountSettings.password
      },
      set(value) {
        this.setAccountSettings({
          name: 'password',
          value,
        })
      },
    },

    passwordConfirmation: {
      get() {
        return this.accountSettings.passwordConfirmation
      },
      set(value) {
        this.setAccountSettings({
          name: 'passwordConfirmation',
          value,
        })
      },
    },

    oldPassword: {
      get() {
        return this.accountSettings.oldPassword
      },
      set(value) {
        this.setAccountSettings({
          name: 'oldPassword',
          value,
        })
      },
    },
    isUser() {
      const role = this.$auth.user?.role?.id ?? UserRoleEnum.GUEST

      return role !== UserRoleEnum.ADMIN && role !== UserRoleEnum.MODERATOR
    },

    isPhoneFocus() {
      return (
        this.typeSettings === TypeSettingsEnum.PHONE ||
        this.typeSettings === null
      )
    },

    isEmailFocus() {
      return (
        this.typeSettings === TypeSettingsEnum.EMAIL ||
        this.typeSettings === null
      )
    },

    isPasswordFocus() {
      return (
        this.typeSettings === TypeSettingsEnum.PASSWORD ||
        this.typeSettings === null
      )
    },

    isNullFocus() {
      return this.typeSettings === null
    },
  },

  methods: {
    ...mapMutations('settings', ['setAccountSettings']),
    ...mapActions('settings', ['sendCode', 'updateAccountSettings']),

    focusPassword() {
      if (this.isUser) {
        this.typeSettings = TypeSettingsEnum.PASSWORD
      }
    },

    focusEmail() {
      if (this.isUser) {
        this.typeSettings = TypeSettingsEnum.EMAIL
      }
    },

    focusPhone() {
      if (this.isUser) {
        this.typeSettings = TypeSettingsEnum.PHONE
      }
    },

    async saveAccountSettings() {
      const payload = {}

      if (this.isPasswordFocus) {
        payload.password = this.password
        payload.oldPassword = this.oldPassword
        payload.passwordConfirmation = this.passwordConfirmation
      }

      if (this.isEmailFocus) {
        payload.email = this.email
      }

      if (this.isPhoneFocus) {
        payload.phone = this.phone
      }

      if (this.isUser && this.typeSettings !== null) {
        payload.type = this.typeSettings
        this.modal = await this.sendCode(payload)

        this.typeSettings = null
      } else {
        await this.updateAccountSettings()
      }
    },
  },
}
</script>
