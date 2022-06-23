<template>
  <div
    v-click-outside="close"
    class="input-dropdown"
    :class="{ 'disabled-input': disabled }"
  >
    <span class="input-dropdown__label">
      {{ label }}
      <template v-if="isRequired">
        <span class="input-dropdown__label__required">*</span>
      </template>
    </span>
    <button
      class="input-dropdown__target"
      :class="{ 'error-border': error }"
      @click="showMenu"
    >
      <template v-if="value === null || value.length < 1">
        <span class="input-dropdown__target__placeholder">
          {{ placeholder }}</span
        >
      </template>
      <template v-else>
        <span class="input-dropdown__target__value"> {{ value }}</span>
      </template>
      <svg-icon name="arrow" :class="{ 'icon-show': isShow }" />
    </button>
    <transition name="slide">
      <template v-if="isShow">
        <div class="input-dropdown__menu">
          <slot
            name="menu"
            :close="close"
            :className="'input-dropdown__menu__item'"
          />
        </div>
      </template>
    </transition>
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
  name: 'InputDropdown',

  props: {
    value: {
      type: [String, Number],
      default: null,
    },

    disabled: {
      type: Boolean,
    },

    error: {
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

    label: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      isShow: false,
    }
  },

  methods: {
    close() {
      this.isShow = false
    },

    showMenu() {
      if (!this.disabled) {
        this.isShow = !this.isShow
      }
    },
  },
}
</script>
