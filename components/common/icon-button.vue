<template>
  <button class="icon-button">
    <svg-icon :name="icon" :width="width" :height="height" />
  </button>
</template>

<script>
export default {
  name: 'IconButton',

  props: {
    icon: {
      type: String,
      required: true,
    },

    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
  },
}
</script>
