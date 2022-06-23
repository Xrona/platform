<template>
  <div class="user-options">
    <box-button text="Сохранить" class="main-button" @click="save" />
    <div class="user-options__content">
      <box-button text="Одобрить" class="with-icon" @click="approve" />
      <box-button text="Отклонить" class="red-button" @click="reject" />
    </div>
  </div>
</template>

<script>
import BoxButton from '@/components/common/box-button'
export default {
  name: 'UserOptions',

  components: { BoxButton },

  methods: {
    approve() {
      this.$emit('approve')
    },

    reject() {
      this.$emit('reject')
    },

    save() {
      this.$router.push('/users')
    },
  },
}
</script>
