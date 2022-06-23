<template>
  <div class="text-input">
    <template v-if="label && inputId">
      <label :for="inputId" class="text-input__label">
        <span>
          {{ label }}
          <template v-if="isRequired">
            <span class="text-input__required">*</span>
          </template>
        </span>
      </label>
    </template>
    <template v-if="prefixIcon">
      <div class="text-input__prefix-icon">
        <svg-icon :name="prefixIcon" :fill="fill" />
      </div>
    </template>
    <div class="text-input__body">
      <input
        :id="inputId"
        v-model.trim="currentValue"
        :class="{ 'error-border': error, 'success-border': success }"
        :type="localInputType"
        :placeholder="placeholder"
        :disabled="disabled"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus')"
      />
      <template v-if="hasIcon">
        <button class="text-input__icon" @click="showPassword">
          <svg-icon
            :name="localInputType === 'password' ? 'hide-eye' : 'eye-outlined'"
          />
        </button>
      </template>
    </div>
    <template v-if="error">
      <div class="error-validation">
        <svg-icon name="error" />
        <span>{{ errorMessage }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TextInput',

  model: {
    event: 'change',
    prop: 'value',
  },

  props: {
    value: {
      type: [String, Number],
      required: true,
    },

    prefixIcon: {
      type: String,
      default: null,
    },

    hasIcon: {
      type: Boolean,
    },

    fill: {
      type: Boolean,
    },

    inputType: {
      type: String,
      default: 'text',
    },

    label: {
      type: String,
      default: null,
    },

    inputId: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: '',
    },

    isRequired: {
      type: Boolean,
    },

    error: {
      type: [Boolean, String],
      default: false,
    },

    success: {
      type: Boolean,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localInputType: null,
    }
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

    errorMessage() {
      if (typeof this.error === 'boolean') {
        return 'Неверный логин или пароль'
      }

      return this.error
    },
  },

  created() {
    this.localInputType = this.inputType
  },

  methods: {
    showPassword() {
      this.localInputType =
        this.localInputType === 'password' ? 'text' : 'password'
    },
  },
}
</script>
