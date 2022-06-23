<template>
  <v-row>
    <v-col
      cols="12"
      class="step__buttons py-0"
      :class="{ 'first-step': step === 0 }"
    >
      <slot />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'StepButtons',

  props: {
    step: {
      type: Number,
      default: 0,
    },
  },
}
</script>
