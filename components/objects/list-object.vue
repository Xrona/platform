<template>
  <div class="data-object">
    <img
      src="https://images.unsplash.com/photo-1580140536950-d6897b5d6e2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      alt="Object image"
    />
    <div class="data-object__content">
      <h3>{{ name }}</h3>
      <data-address :address="address" />
      <progress-line :sum="sum" />
    </div>
  </div>
</template>

<script>
import ProgressLine from '@/components/common/progress-line'
import DataAddress from '@/components/common/data-address'
export default {
  name: 'ListObject',

  components: { ProgressLine, DataAddress },

  props: {
    options: {
      type: Object,
      default: Object,
    },
  },

  computed: {
    name() {
      return this.options?.name ?? ''
    },
    address() {
      return this.options?.address ?? ''
    },
    sum() {
      return this.options?.sum ?? {}
    },
  },
}
</script>

<style scoped></style>
