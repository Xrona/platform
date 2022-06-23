<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <div class="auth-form reset-form">
          <h1>{{ title }}</h1>
          <p>
            {{ description }}
          </p>
          <slot name="resetForm" :className="'login-form__content'" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ResetForm',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>
