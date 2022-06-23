<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2" class="py-0">
        <div class="auth-form">
          <h1>{{ title }}</h1>
          <p>
            {{ description }}
            <template v-if="number">
              <br />
              {{ number }}
            </template>
          </p>
          <slot name="formBody" :className="'login-form__content'" />
          <div class="auth-form__sign-in">
            <span>
              Уже зарегистрированы?
              <nuxt-link to="/login">Войти</nuxt-link>
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterForm',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    number: {
      type: String,
      default: null,
    },
  },
}
</script>
