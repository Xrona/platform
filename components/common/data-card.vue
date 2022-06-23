<template>
  <div class="data-card">
    <div class="data-card__image">
      <template v-if="status">
        <card-status class="data-card__image__status" :status="status" />
      </template>
      <img :src="image" alt="Image" />
    </div>
    <div class="data-card__content">
      <h3>{{ name }}</h3>
      <data-option icon="home" :name="objectType" width="16" height="16" />
      <data-option icon="location" :name="address" width="16" height="16" />
      <template v-if="investAmount">
        <div class="data-card__content__investment-amount">
          <span>Сумма вложений</span>
          <span>{{ investAmount }}</span>
        </div>
      </template>
      <progress-line :sum="sum" />
      <template v-if="percent">
        <div class="data-card__content__profitability">
          <span>Доходность</span>
          <span>{{ percent }}%</span>
        </div>
      </template>
      <slot name="button" :isRejected="isRejected" />
    </div>
  </div>
</template>

<script>
import CardStatus from '@/components/common/card-status'
import DataOption from '@/components/common/data-option'
import ProgressLine from '@/components/common/progress-line'
import StatusCardEnum from '@/enums/status-card'
export default {
  name: 'DataCard',

  components: { ProgressLine, DataOption, CardStatus },

  props: {
    content: {
      type: Object,
      default: null,
    },
  },

  computed: {
    name() {
      return this.content?.name ?? ''
    },
    sum() {
      return this.content?.sum ?? {}
    },
    address() {
      return this.content?.address ?? ''
    },
    objectType() {
      return this.content?.objectType ?? ''
    },
    image() {
      return this.content?.files?.images?.[0]?.url ?? ''
    },
    status() {
      return this.content?.status ?? null
    },
    investAmount() {
      return this.content?.investAmount ?? false
    },
    percent() {
      return this.content?.percent ?? false
    },

    isRejected() {
      return (
        this.status === StatusCardEnum.REJECTED ||
        this.status === StatusCardEnum.WITHDRAWN
      )
    },
  },
}
</script>
