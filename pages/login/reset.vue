<template>
  <reset-form :title="title" :description="description">
    <template #resetForm="{ className }">
      <template v-if="step === 0">
        <reset-form-fields :class="className" @nextStep="nextStep" />
      </template>
      <template v-if="step === 1">
        <reset-form-confirm :class="className" @nextStep="confirmCode" />
      </template>
      <template v-if="step === 2">
        <reset-form-change-password
          :token="token"
          :class="className"
          @nextStep="nextStep"
        />
      </template>
      <template v-if="step === 3">
        <div :class="className">
          <box-button text="Войти" class="main-button" @click="goToLogin" />
        </div>
      </template>
    </template>
  </reset-form>
</template>

<script>
import ResetForm from '@/components/auth/reset-form'
import ResetFormFields from '@/components/auth/reset-form-fields'
import ResetFormConfirm from '@/components/auth/reset-form-confirm'
import ResetFormChangePassword from '@/components/auth/reset-form-change-password'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'ResetPage',

  components: {
    BoxButton,
    ResetFormChangePassword,
    ResetFormConfirm,
    ResetFormFields,
    ResetForm,
  },

  layout: 'auth-layout',

  data() {
    return {
      step: 0,
      token: '',
    }
  },

  computed: {
    title() {
      if (this.step === 0) {
        return 'Укажите email или телефон'
      }

      if (this.step === 1) {
        return 'Подтвердите'
      }

      if (this.step === 2) {
        return 'Введите новый пароль'
      }

      return 'Вы успешно изменили пароль'
    },

    description() {
      if (this.step === 0) {
        return 'Пожалуйста, укажите email или телефон, который вы использовали для входа на сайт'
      }

      if (this.step === 1) {
        return 'Укажите код, который был отправлен на указанную вами почту и/или телефон'
      }

      if (this.step === 2) {
        return 'Укажите новый пароль для входа'
      }

      return 'Новые данные будут отправлены вам на указанную при регистрации почту'
    },
  },

  methods: {
    nextStep() {
      if (this.step < 3) {
        this.step++
      }
    },

    confirmCode(token) {
      this.token = token

      this.nextStep()
    },

    goToLogin() {
      this.$router.push('/login/login')
    },
  },
}
</script>
