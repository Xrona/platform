<template>
  <div class="reset-form__fields">
    <text-input
      v-model="userData"
      input-id="resetUserData"
      label="Email / Номер телефона"
      placeholder="example@mail.ru"
      :is-required="true"
      :error="errorMessage"
    />
    <box-button text="Далее" class="main-button" @click="nextStep" />
    <nuxt-link to="/" class="link"
      >Я не помню эти данные или они недоступны</nuxt-link
    >
  </div>
</template>

<script>
import BoxButton from '@/components/common/box-button'
import TextInput from '@/components/common/text-input'
export default {
  name: 'ResetFormFields',

  components: { TextInput, BoxButton },

  data() {
    return {
      userData: '',
      error: false,
    }
  },

  computed: {
    errorMessage() {
      return this.error ?? false
    },
  },

  methods: {
    async nextStep() {
      this.error = false

      await this.$load(
        async () => {
          await this.$api.reset
            .sendUserData({
              phone: this.userData,
            })
            .then(() => this.$emit('nextStep'))
        },
        async (error) => {
          console.log(error.response.data.errors.phone[0])
          this.error = await error.response?.data?.errors?.phone?.[0]
        }
      )
    },
  },
}
</script>
