<template>
  <div class="reset-form__change-password">
    <text-input
      v-model="password"
      input-id="resetFormPassword"
      label="Новый пароль"
      :is-required="true"
      :error="error"
    />
    <text-input
      v-model="passwordConfirm"
      input-id="resetFormConfirmPassword"
      label="Повторите новый пароль"
      :is-required="true"
    />
    <box-button text="Далее" class="main-button" @click="changePassword" />
  </div>
</template>

<script>
import TextInput from '@/components/common/text-input'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'ResetFormChangePassword',

  components: { BoxButton, TextInput },

  props: {
    token: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      password: '',
      passwordConfirm: '',
      error: false,
    }
  },

  methods: {
    async changePassword() {
      this.error = false

      await this.$load(
        async () =>
          await this.$api.reset
            .changePassword({
              token: this.token,
              password: this.password,
              password_confirmation: this.passwordConfirm,
            })
            .then(() => this.$emit('nextStep')),
        (error) => {
          this.error =
            error.response.data?.errors?.password?.[0] ?? 'Ошибка ввода даных'
        }
      )
    },
  },
}
</script>
