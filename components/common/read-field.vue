<template>
  <div class="read-field">
    <span>{{ label }}</span>
    <div>
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadField',

  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>
