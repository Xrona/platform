<template>
  <div class="period-buttons" :class="{ 'only-dropdown': onlyDropdown }">
    <div class="period-buttons__list">
      <template v-for="option in $options.timeOptions">
        <button
          :key="option.name"
          class="time-button"
          :class="{ active: timeOption.value === option.value }"
          @click="selectPeriod(option.value)"
        >
          {{ option.name }}
        </button>
      </template>
    </div>
    <box-dropdown class="period-buttons__dropdown white-dropdown">
      <template #target>
        <span>
          {{ timeOption.name }}
        </span>
      </template>
      <template #menu="{ className, closeMenu }">
        <template v-for="option in $options.timeOptions">
          <template v-if="timeOption.value !== option.value">
            <button
              :key="`dropdown-${option.name}`"
              :class="className"
              @click="selectPeriod(option.value, closeMenu)"
            >
              {{ option.name }}
            </button>
          </template>
        </template>
      </template>
    </box-dropdown>
  </div>
</template>

<script>
import BoxDropdown from '@/components/common/box-dropdown'
import SortDateEnum from '@/enums/sort-date'
export default {
  name: 'PeriodButtons',

  components: { BoxDropdown },

  model: {
    event: 'change',
    prop: 'value',
  },

  props: {
    value: {
      type: String,
      default: null,
    },

    onlyDropdown: {
      type: Boolean,
    },
  },

  computed: {
    timeOption() {
      let option = {}

      this.$options.timeOptions.some((elem) => {
        option = elem

        return this.value === elem.value
      })

      return option
    },
  },

  methods: {
    selectPeriod(value, fn = null) {
      this.$emit('change', value)

      if (fn) {
        fn()
      }
    },
  },

  timeOptions: [
    {
      name: 'Квартал',
      value: SortDateEnum.QUARTER,
    },
    {
      name: 'Полгода',
      value: SortDateEnum.HALFYEAR,
    },
    {
      name: 'Год',
      value: SortDateEnum.YEAR,
    },
    {
      name: 'Весь период',
      value: null,
    },
  ],
}
</script>
