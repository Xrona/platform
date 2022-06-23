<template>
  <div class="security-form">
    <h1>{{ title }}</h1>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SecurityForm',

  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
