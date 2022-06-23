<template>
  <div class="data-address">
    <svg-icon name="location" />
    <span>{{ address }}</span>
  </div>
</template>

<script>
export default {
  name: 'DataAddress',

  props: {
    address: {
      type: String,
      default: '',
    },
  },
}
</script>
