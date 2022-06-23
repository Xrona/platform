<template>
  <div class="data-content__options">
    <h3>Описание и характеристики</h3>
    <div class="data-information">
      <div class="data-information__property">
        <svg-icon name="living" />
        <span>1 гостинная</span>
      </div>
      <div class="data-information__property">
        <svg-icon name="sleeping" />
        <span>2 спальни</span>
      </div>
      <div class="data-information__property">
        <svg-icon name="bathroom" />
        <span>2 ванных компнаты</span>
      </div>
      <div class="data-information__property">
        <svg-icon name="floor" />
        <span>1 этаж (без подвала)</span>
      </div>
      <div class="data-information__property">
        <svg-icon name="garage" />
        <span>Гараж на 2 машины</span>
      </div>
      <div class="data-information__property">
        <svg-icon name="users-fill" />
        <span>На 4 человека</span>
      </div>
      <div class="data-information__property">
        <svg-icon name="area" />
        <span>S дома {{ area }} (м3)</span>
      </div>
      <div class="data-information__property">
        <svg-icon name="area-land" />
        <span>S участка {{ landArea }}</span>
      </div>
    </div>
    <div class="data-progress">
      <h3>Инвестирование и реализация проекта</h3>
      <progress-line :sum="sum" />
    </div>
    <div class="data-description">
      <div class="data-description__stats">
        <div class="data-description__stats__item data-item">
          <span>{{ investorsCount }}</span>
          <span>Ивесторов</span>
        </div>
      </div>
      <p>
        {{ description }}
      </p>
      <div class="data-content__options__buttons">
        <box-button text="Скачать" icon="file-save" class="with-icon" />
        <template v-if="isInvestor">
          <box-button
            text="Инвестировать"
            class="main-button"
            @click="modal = true"
          />
        </template>
      </div>
      <v-dialog v-model="modal">
        <invest-modal
          v-model="investSum"
          :name="name"
          :min="min"
          :max="max"
          @invest="invest"
          @closeModal="closeModal"
        />
      </v-dialog>
    </div>
  </div>
</template>

<script>
import ProgressLine from '@/components/common/progress-line'
import BoxButton from '@/components/common/box-button'
import UserRoleEnum from '@/enums/user-role'
import InvestModal from '@/components/objects/invest-modal'
export default {
  name: 'DataOptions',

  components: { InvestModal, BoxButton, ProgressLine },

  props: {
    options: {
      type: Object,
      default: Object,
    },
  },

  data() {
    return {
      percent: 44,
      modal: false,
      max: 100000,
      investSum: 0,
      min: 1000,
    }
  },

  computed: {
    name() {
      return this.options?.name ?? ''
    },

    sum() {
      return {
        requested: this.options?.requestedSum ?? 0,
        collected: this.options?.collectedSum ?? 0,
        collectedPercent: this.options?.collectedPercentSum ?? 0,
      }
    },

    area() {
      return this.options?.houseArea ?? '0'
    },

    landArea() {
      return this.options?.landAreaConversion ?? '0'
    },

    description() {
      return this.options?.description ?? ''
    },

    investorsCount() {
      return this.options?.investorsCount ?? 0
    },

    isInvestor() {
      return this.$auth.user?.role?.id === UserRoleEnum.INVESTOR
    },
  },

  methods: {
    closeModal() {
      this.modal = false
      this.investSum = this.min
    },

    invest() {
      console.log(this.investSum)
    },
  },
}
</script>
