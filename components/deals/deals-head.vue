<template>
  <v-col class="py-0" cols="12">
    <div class="deals__head">
      <h1>Сделки</h1>
    </div>
    <div class="deals__nav">
      <box-dropdown class="nav-filter">
        <template #target>
          <svg-icon :name="filter.icon" width="24" height="24" />
          <span>{{ filter.name }}</span>
        </template>
        <template #menu="{ closeMenu, className }">
          <template v-for="item in $options.filterList">
            <button
              :key="`mobileFilter${item.name}`"
              :class="className"
              @click="selectFilter(item.value, closeMenu)"
            >
              <svg-icon :name="item.icon" width="24" height="24" />
              <span>{{ item.name }}</span>
            </button>
          </template>
        </template>
      </box-dropdown>
      <period-buttons v-model="selectSort" class="nav-period" />
    </div>
  </v-col>
</template>

<script>
import BoxDropdown from '@/components/common/box-dropdown'
import PeriodButtons from '@/components/common/period-buttons'
import DealStatusEnum from '@/enums/deal-status'

export default {
  name: 'DealsHead',

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

    filter() {
      let filter = {}

      this.$options.filterList.some((elem) => {
        filter = elem

        return elem.value === this.sortFilter.filter
      })

      return filter
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

  filterList: [
    {
      value: null,
      name: 'Все сделки',
      icon: 'all',
    },
    {
      value: DealStatusEnum.InProgress,
      name: 'В процессе',
      icon: 'time',
    },
    {
      value: DealStatusEnum.Withdrawn,
      name: 'Вывод средств',
      icon: 'swap',
    },
    {
      value: DealStatusEnum.Finished,
      name: 'Успешные',
      icon: 'success',
    },
    {
      value: DealStatusEnum.Rejected,
      name: 'Отмененные',
      icon: 'close',
    },
  ],
}
</script>
