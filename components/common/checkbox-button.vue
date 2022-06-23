<template>
  <div
    class="checkbox-button"
    :class="{ active: currentValue }"
    @click="currentValue = !currentValue"
  >
    <button :disabled="disabled" @click.stop="currentValue = !currentValue">
      <svg-icon name="checkbox-success" />
    </button>
    <template v-if="title.length > 0">
      <span>{{ title }}</span>
    </template>
    <template v-if="error">
      <div class="checkbox-button__error">
        {{ error }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CheckboxButton',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: {
      type: Boolean,
      required: true,
    },

    title: {
      type: String,
      default: '',
    },

    error: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
    },
  },

  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        if (!this.disabled) {
          this.$emit('change', value)
        }
      },
    },
  },
}
</script>
