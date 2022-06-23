<template>
  <div>
    <text-input
      v-model="name"
      label="Ваше имя"
      input-id="registerName"
      :error="errorName"
      placeholder="Иван"
      :is-required="true"
    />
    <text-input
      v-model="phone"
      v-mask="'+7 (###) ### ##-##'"
      masked="true"
      label="Телефон (требуется подтверждение)"
      input-id="registerPhone"
      placeholder="+7 (###) ### ##-##"
      type-input="tel"
      :error="errorPhone"
      :is-required="true"
    />
    <text-input
      v-model="email"
      label="Эл. почта"
      input-id="registerEmail"
      placeholder="example@mail.ru"
      c
      type-input="mail"
      :error="errorEmail"
      :is-required="true"
    />
    <div class="auth-form__content__confirm-agreement">
      <checkbox-button
        v-model="confirm"
        title="Подтверждаю, что ознакомился и согласен с Пользовательским соглашением и
        Условиями оферты"
      />
    </div>
    <template v-if="errorConfirm">
      <div class="error-validation">
        <svg-icon name="error" />
        <span>{{ errorConfirm }}</span>
      </div>
    </template>
    <checkbox-button
      v-model="emailNotification"
      title="Соглашения на отправку уведомлений по почте"
    />
    <div class="d-flex justify-center">
      <box-button
        class="auth-form__content__form-button main-button"
        text="Подтвердить"
        @click="eventEmit"
      />
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/common/text-input'
import CheckboxButton from '~/components/common/checkbox-button'
import BoxButton from '~/components/common/box-button'
export default {
  name: 'RegisterFormFields',

  components: { BoxButton, CheckboxButton, TextInput },

  model: {
    event: 'change',
    prop: 'userData',
  },

  props: {
    userData: {
      type: Object,
      required: true,
    },

    error: {
      type: Object,
      default: null,
    },
  },

  computed: {
    name: {
      get() {
        return this.userData.name
      },
      set(value) {
        const newUser = { ...this.userData }
        newUser.name = value

        this.clearError('name')

        this.$emit('change', newUser)
      },
    },
    phone: {
      get() {
        return this.userData.phone
      },
      set(value) {
        const newUser = { ...this.userData }
        newUser.phone = value

        this.clearError('phone')

        this.$emit('change', newUser)
      },
    },
    email: {
      get() {
        return this.userData.email
      },
      set(value) {
        const newUser = { ...this.userData }
        newUser.email = value

        this.clearError('email')

        this.$emit('change', newUser)
      },
    },
    confirm: {
      get() {
        return this.userData.confirm
      },
      set(value) {
        const newUser = { ...this.userData }
        newUser.confirm = value

        this.$emit('change', newUser)
      },
    },
    emailNotification: {
      get() {
        return this.userData.emailNotification ?? false
      },
      set(value) {
        const newUser = { ...this.userData, email_notification: value }

        this.$emit('change', newUser)
      },
    },

    errorName() {
      return this.error?.name ?? false
    },

    errorPhone() {
      return this.error?.phone ?? false
    },

    errorEmail() {
      return this.error?.email ?? false
    },

    errorConfirm() {
      return this.error?.confirm ?? false
    },
  },

  methods: {
    eventEmit() {
      this.$emit('confirm')
    },

    clearError(property) {
      const error = { ...this.error }
      error[property] = false

      this.$emit('clearError', error)
    },
  },
}
</script>
