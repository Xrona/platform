<template>
  <div class="reset-form__confirm">
    <text-input
      v-model="code"
      input-id="resetFormConfirm"
      label="Введите полученный код из sms"
      :is-required="true"
      :error="error"
    />
    <box-button text="Далее" class="main-button" @click="confirmCode" />
    <a href="#">Отправить повторно</a>
  </div>
</template>

<script>
import TextInput from '@/components/common/text-input'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'ResetFormConfirm',

  components: { BoxButton, TextInput },

  data() {
    return {
      code: '',
      error: false,
    }
  },

  methods: {
    async confirmCode() {
      this.error = false
      await this.$load(
        () =>
          this.$api.reset
            .confirmToken({
              token: this.code,
            })
            .then((response) => {
              const token = response.data.data?.tokenData?.token ?? ''
              this.$emit('nextStep', token)
            }),
        (error) => {
          this.error = error.response.data.message
        }
      )
    },
  },
}
</script>
