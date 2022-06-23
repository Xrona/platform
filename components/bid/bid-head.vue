<template>
  <div class="bid__head">
    <h1>Заявки</h1>
    <nuxt-link
      to="/lk/bid/create"
      class="bid__head__create-bid box-button with-icon"
    >
      <svg-icon name="create" width="20" height="20" :fill="false" />
      <span>Создать</span>
    </nuxt-link>
    <box-dropdown class="bid__head__filters">
      <template #target>
        <span class="bid__head__filters__target">
          <svg-icon name="diagram" />
          <span>Все заявки</span>
        </span>
      </template>
      <template #menu="slotProps">
        <template v-for="filter in $options.filterOptions">
          <button
            :key="`${filter.name}-DropDown`"
            :class="slotProps.className"
            @click="selectFilter(filter.value, slotProps.closeMenu)"
          >
            <svg-icon :name="filter.icon" />
            <span>{{ filter.name }}</span>
          </button>
        </template>
      </template>
    </box-dropdown>
    <period-buttons v-model="selectSort" />
  </div>
</template>

<script>
import BoxDropdown from '~/components/common/box-dropdown'
import BidStatusEnum from '@/enums/bid-status'
import PeriodButtons from '@/components/common/period-buttons'

export default {
  name: 'BidHead',

  components: { PeriodButtons, BoxDropdown },

  model: {
    prop: 'sortFilter',
    event: 'change',
  },

  props: {
    sortFilter: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectSort: {
      get() {
        return this.sortFilter.sort
      },
      set(value) {
        this.$emit('change', {
          sort: value,
          filter: this.sortFilter.filter,
        })
      },
    },
  },

  methods: {
    selectFilter(value, fn = null) {
      this.$emit('change', {
        sort: this.sortFilter.sort,
        filter: value,
      })

      if (fn) {
        fn()
      }
    },
  },

  filterOptions: [
    {
      name: 'Все заявки',
      value: null,
      icon: 'diagram',
    },
    {
      name: 'На модерацию',
      value: BidStatusEnum.Moderation,
      icon: 'key',
    },
    {
      name: 'В процессе',
      value: BidStatusEnum.InProgress,
      icon: 'time',
    },
    {
      name: 'Успешные',
      value: BidStatusEnum.Finished,
      icon: 'success',
    },
    {
      name: 'Отмененные',
      value: BidStatusEnum.Rejected,
      icon: 'close',
    },
  ],
}
</script>
