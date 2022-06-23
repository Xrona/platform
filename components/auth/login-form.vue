<template>
  <v-container @keydown.enter="submit">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <div class="auth-form login-form">
          <h1>Вход</h1>
          <p>
            Введите номер телефона или электронную почту, которые вы указывали
            при регистрации
          </p>
          <div class="auth-form__content">
            <text-input
              v-model="login"
              class="mb-2 mb-md-0"
              label="Email/Номер телефона"
              input-id="loginEmail"
              placeholder="example@mail.ru"
              :error="errorMessage('login')"
              :success="success"
              :is-required="true"
            />
            <text-input
              v-model="password"
              label="Пароль"
              input-id="loginPassword"
              input-type="password"
              :has-icon="true"
              placeholder="Введите пароль"
              :error="errorMessage('password')"
              :success="success"
              :is-required="true"
            />
            <nuxt-link class="auth-form__content__remember" to="/login/reset">
              Забыли пароль?
            </nuxt-link>
            <box-button
              class="auth-form__content__form-button main-button"
              text="Войти"
              @click="submit"
            />
            <div class="auth-form__sign-in">
              <span>
                Нет аккаунта?
                <nuxt-link to="/login/register">Регистрация</nuxt-link>
              </span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TextInput from '~/components/common/text-input'
import BoxButton from '~/components/common/box-button'
export default {
  name: 'LoginForm',

  components: { BoxButton, TextInput },

  data() {
    return {
      login: '',
      password: '',
      error: false,
      success: false,
    }
  },

  watch: {
    login(value) {
      this.error = false
    },
    password(value) {
      this.error = false
    },
  },

  methods: {
    errorMessage(name) {
      if (typeof this.error === 'object') {
        return this.error[name]
      } else {
        return this.error
      }
    },

    async submit() {
      const hasErrors = this.hasErrors()

      if (!hasErrors) {
        await this.$api.user
          .login({
            login: this.login,
            password: this.password,
          })
          .then(async (response) => {
            const data = response.data?.data ?? null
            const accessToken = data?.access_token?.token ?? null
            const refreshToken = data?.refresh_token?.token ?? null
            const user = data?.user ?? null

            if (accessToken) {
              this.success = true

              await this.$auth
                .setUserToken(accessToken, refreshToken)
                .then(() => {
                  this.$auth.setUser(user)
                  this.$router.push('/lk')
                })
            }
          })
          .catch(() => {
            this.error = true
          })

        // await this.$login
        //   .loginWith('local', {
        //     data: {
        //       login: this.login,
        //       password: this.password,
        //     },
        //   })
        //   .then(() => {
        //     this.success = true
        //     // this.$router.push('/')
        //   })
        //   .catch(() => {
        //     this.error = true
        //   })
      }
    },

    hasErrors() {
      const data = { login: this.login, password: this.password }
      const keys = Object.keys(data)
      let hasErrors = false

      keys.forEach((key) => {
        if (data[key] === '') {
          hasErrors = true

          // eslint-disable-next-line no-prototype-builtins
          this.error = {
            ...this.error,
            [key]: 'данное поле является обязательным',
          }
        }
      })

      return hasErrors
    },
  },
}
</script>
