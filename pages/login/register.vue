<template>
  <register-form :title="title" :description="description" :number="number">
    <template #formBody="slotProps">
      <template v-if="step === 1">
        <register-form-fields
          v-model="newUser"
          :class="slotProps.className"
          :error="error"
          @confirm="confirmRegister"
          @clearError="clearError"
        />
      </template>
      <template v-if="step === 2">
        <register-form-confirm
          :class="slotProps.className"
          @confirmPhone="confirmPhone"
        />
      </template>
      <template v-if="step === 3">
        <register-form-complete :class="slotProps.className" />
      </template>
    </template>
  </register-form>
</template>

<script>
import RegisterForm from '~/components/auth/register-form'
import RegisterFormFields from '~/components/auth/register-form-fields'
import RegisterFormConfirm from '~/components/auth/register-form-confirm'
import RegisterFormComplete from '~/components/auth/register-form-complete'
export default {
  name: 'RegisterPage',

  components: {
    RegisterFormComplete,
    RegisterFormConfirm,
    RegisterFormFields,
    RegisterForm,
  },

  layout: 'auth-layout',

  data() {
    return {
      step: 1,
      newUser: {
        name: '',
        email: '',
        phone: '',
        confirm: false,
      },
      error: {},
    }
  },

  head() {
    return {
      title: 'Регистрация',
    }
  },

  computed: {
    title() {
      if (this.step > 2) {
        return 'Регистрация прошла успешно'
      }

      return 'Регистрация'
    },

    description() {
      if (this.step === 1) {
        return 'Введите номер телефона или электронную почту'
      }
      if (this.step === 2) {
        return 'Введите код, отправленный на  ваш номер:'
      }

      return 'Теперь вы можете просматривать объекты и управлять своим личным кабинетом'
    },

    number() {
      if (this.step === 2) {
        return this.newUser.phone
      }

      return null
    },
  },

  methods: {
    async confirmRegister() {
      this.error = {}

      if (this.newUser.confirm) {
        const hasErrors = this.hasErrors()

        if (!hasErrors) {
          await this.$api.user
            .register({
              name: this.newUser.name,
              email: this.newUser.email,
              phone: this.$case.phone(this.newUser.phone),
            })
            .then((response) => {
              ++this.step
            })
            .catch((error) => {
              const errors = error.response.data.errors

              this.error = {
                name: errors?.name?.[0] ?? false,
                phone: errors?.phone?.[0] ?? false,
                email: errors?.email?.[0] ?? false,
              }
            })
        }
      } else {
        this.error = {
          confirm:
            'Необходимо подтвердить ознакомление с пользовательским соглашением',
        }
      }
    },

    hasErrors() {
      const keys = Object.keys(this.newUser)
      let hasErrors = false

      keys.forEach((key) => {
        if (this.newUser[key] === '') {
          hasErrors = true

          // eslint-disable-next-line no-prototype-builtins
          if (this.error.hasOwnProperty(key)) {
            this.error[key] = 'данное поле является обязательным'
          } else {
            this.error = {
              ...this.error,
              [key]: 'данное поле является обязательным',
            }
          }
        }
      })

      return hasErrors
    },

    clearError(error) {
      this.error = error
    },

    async confirmPhone(value) {
      await this.$api.user.confirmPhone(value).then(async () => {
        ++this.step

        const phone = this.newUser.phone.replace(/[^+\d]/g, '')

        await this.$api.user.registerComplete({
          phone,
        })
      })
    },
  },
}
</script>
