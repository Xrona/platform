<template>
  <div class="text-box">
    <label :for="boxId" class="text-box__label">
      <span>
        {{ label }}
        <template v-if="isRequired">
          <span class="text-box__label__required">*</span>
        </template>
      </span>
    </label>
    <textarea
      :id="boxId"
      v-model.trim="currentValue"
      :placeholder="placeholder"
      :class="{ 'error-border': error }"
    />
    <template v-if="error">
      <div class="error-validation">
        <svg-icon name="error" />
        <span>{{ error }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TextBox',

  model: {
    event: 'change',
    prop: 'value',
  },

  props: {
    boxId: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: '',
    },

    isRequired: {
      type: Boolean,
    },

    error: {
      type: [String, Boolean],
      default: false,
    },
  },

  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
}
</script>
