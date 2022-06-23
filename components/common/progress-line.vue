<template>
  <div class="progress-line">
    <div class="progress-line__head">
      <h4>Уже привлечено</h4>
      <h4>Цель</h4>
      <p>{{ collected }}</p>
      <p>{{ requested }}</p>
    </div>
    <div
      :class="{ rejected: rejected }"
      :style="`--percent: ${collectedPercent}%`"
      class="progress-line__content"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressLine',

  props: {
    rejected: {
      type: Boolean,
      default: false,
    },
    sum: {
      type: Object,
      default: null,
    },
  },

  computed: {
    requested() {
      if (!this.sum?.requested) {
        return ''
      }

      return this.$priceFormat(this.sum?.requested)
    },
    collected() {
      if (!this.sum?.collected) {
        return ''
      }

      return this.$priceFormat(this.sum?.collected)
    },
    collectedPercent() {
      if (!this.sum?.collectedPercent) {
        return ''
      }

      return this.$priceFormat(this.sum?.collectedPercent)
    },
  },
}
</script>
