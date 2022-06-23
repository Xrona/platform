<template>
  <div class="card-status" :class="status">
    <template v-if="status === statuses.MODERATION">
      <svg-icon name="time" />
      <span>На модерации</span>
    </template>
    <template v-if="status === statuses.INPROGRESS">
      <svg-icon name="time" />
      <span>В процессе</span>
    </template>
    <template v-if="status === statuses.FINISHED">
      <svg-icon name="success" />
      <span>Успешно проведена</span>
    </template>
    <template v-if="status === statuses.REJECTED">
      <svg-icon name="close" />
      <span>Отменена</span>
    </template>
    <template v-if="status === statuses.WITHDRAWN">
      <svg-icon name="close" />
      <span>Отозвана</span>
    </template>
  </div>
</template>

<script>
import StatusCardEnum from '~/enums/status-card'

export default {
  name: 'CardStatus',

  props: {
    status: {
      type: String,
      required: true,
    },
  },

  computed: {
    statuses() {
      return StatusCardEnum
    },
  },
}
</script>
