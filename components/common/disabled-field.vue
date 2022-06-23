<template>
  <div class="disabled-field">
    <template v-if="label">
      <div class="disabled-field__label">{{ label }}</div>
      <div class="disabled-field__content">
        <span>{{ value }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DisabledField',

  props: {
    label: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>
