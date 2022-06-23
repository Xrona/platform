<template>
  <div class="table-board">
    <div class="table-row table-head">
      <div class="table-row__number">#</div>
      <slot name="tableHead" />
    </div>
    <template v-for="(row, index) in items">
      <div :key="`nba${row}`" class="table-row" @click="clickToRow(row)">
        <div class="table-row__number">
          {{ index + 1 }}
        </div>
        <slot name="content" :row="row" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TableBoard',

  props: {
    items: {
      type: Array,
      default: null,
    },
  },

  methods: {
    clickToRow(row) {
      this.$emit('clickToRow', row)
    },
  },
}
</script>
