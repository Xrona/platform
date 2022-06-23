<template>
  <div class="w-full">
    <v-slider
      v-model="count"
      :min="min"
      :max="max"
      :color="color"
      :track-color="trackColor"
      :thumb-color="thumbColor"
    />
    <div class="slider-options">
      <span>
        {{ min }}
      </span>
      <span>
        {{ max }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonSlider',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: {
      type: [Number, undefined],
      default: undefined,
    },

    min: {
      type: [Number, undefined],
      default: undefined,
    },
    max: {
      type: [Number, undefined],
      default: undefined,
    },
  },

  data() {
    return {
      color: '#e6f8f8',
      trackColor: '#FCFCFE',
      thumbColor: '#00B1B9',
    }
  },

  computed: {
    count: {
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

<style lang="scss">
.v-input__slider {
  width: 100%;

  .v-input__slot {
    margin-bottom: 10px;

    .v-slider {
      margin: 0;
      min-height: 12px;
    }
  }

  .v-slider__track-container {
    height: 6px !important;
  }

  .v-slider__thumb-container {
    cursor: pointer;
    .v-slider__thumb {
      width: 12px;
      height: 12px;
      border: 2px solid white !important;

      &::after,
      &::before {
        display: none;
      }
    }
  }
}

.v-messages.theme--light {
  display: none;
}

.slider-options {
  width: 100%;
  display: flex;
  justify-content: space-between;

  span {
    font-weight: 400;
    font-size: 12px;
    color: var(--blue-100);

    &::after {
      content: ' ₽';
    }
  }
}
</style>
