<template>
  <div class="data-option">
    <svg-icon :name="icon" :width="width" :height="height" />
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'DataOption',

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
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
