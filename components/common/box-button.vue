<template>
  <button class="box-button" :disabled="disabled" @click="$emit('click')">
    <template v-if="icon">
      <svg-icon
        :name="icon"
        :width="iconWidth"
        :height="iconHeight"
        :class="iconClass"
      />
    </template>
    <span>{{ text }}</span>
    <slot name="icon" />
  </button>
</template>

<script>
export default {
  name: 'BoxButton',

  props: {
    text: {
      type: String,
      required: true,
    },

    icon: {
      type: [String, Boolean],
      default: false,
    },

    iconWidth: {
      type: String,
      default: '24',
    },

    iconHeight: {
      type: String,
      default: '24',
    },

    iconClass: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
    },
  },
}
</script>
