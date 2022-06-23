<template>
  <box-button
    text="Назад"
    class="white-button back-button"
    icon="arrow"
    icon-class="svg-right"
    @click="click"
  />
</template>

<script>
import BoxButton from '@/components/common/box-button'
export default {
  name: 'BackButton',
  components: { BoxButton },
  methods: {
    click() {
      this.$emit('click')
    },
  },
}
</script>
