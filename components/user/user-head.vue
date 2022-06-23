<template>
  <div class="user-head">
    <back-button @click="back" />
    <h3 class="user-head__title">{{ name }}</h3>
    <div class="user-head__status" :class="{ danger: underReview }">
      <template v-if="underReview">
        <svg-icon name="attention-outlined" :fill="false" />
      </template>
    </div>
    <div class="user-head__remove-button">
      <box-button text="Удалить" icon="trash-alt" class="with-icon" />
    </div>
  </div>
</template>

<script>
import BackButton from '@/components/common/back-button'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'UserHead',

  components: { BoxButton, BackButton },

  props: {
    name: {
      type: String,
      default: '',
    },

    underReview: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    back() {
      this.$router.back()
    },
  },
}
</script>
