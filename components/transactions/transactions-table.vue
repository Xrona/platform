<template>
  <table-board class="transactions__table" :items="transactions">
    <template #tableHead>
      <template v-for="itemHead in $options.tableMenu">
        <div
          :key="`settingsAccessTH${itemHead.name}`"
          :class="{
            transactions__table__sm: itemHead.value > 0,
          }"
        >
          {{ itemHead.name }}
        </div>
      </template>
      <box-dropdown>
        <template #target>
          <span>{{ currentHeadName }}</span>
        </template>
        <template #menu="{ closeMenu, className }">
          <template v-for="itemHead in $options.tableMenu">
            <template
              v-if="itemHead.value !== 0 && itemHead.value !== currentHead"
            >
              <button
                :key="`transactionsBD-${itemHead.name}`"
                :class="className"
                @click="selectColumn(itemHead.value, closeMenu)"
              >
                {{ itemHead.name }}
              </button>
            </template>
          </template>
        </template>
      </box-dropdown>
    </template>
    <template #content="{ row }">
      <div>{{ row.name }}</div>
      <div class="transactions__table__sm">{{ row.statusLabel }}</div>
      <div
        class="transactions__table__sm column-sum"
        :class="{
          negative: isNegativeSum(row.sum),
          positive: !isNegativeSum(row.sum),
        }"
      >
        {{ priceFormat(row.sum) }}
      </div>
      <div class="transactions__table__sm">{{ dateFormat(row.date) }}</div>
      <div class="transactions__table__md">
        <template v-if="checkFiles(row.file)">
          <button class="column-file">
            <svg-icon name="file-save" />
          </button>
        </template>
      </div>
      <div
        class="transactions__table__sm-hide"
        :class="{
          'column-sum': currentHead === 2,
          negative: isNegativeSum(row.sum),
          positive: !isNegativeSum(row.sum),
        }"
      >
        <template v-if="currentHead === 1">{{ row.statusLabel }} </template>
        <template v-if="currentHead === 2">
          {{ priceFormat(row.sum) }}
        </template>
        <template v-if="currentHead === 3">
          {{ dateFormat(row.date) }}
        </template>
      </div>
    </template>
  </table-board>
</template>

<script>
import TableBoard from '@/components/common/table-board'
import BoxDropdown from '@/components/common/box-dropdown'

export default {
  name: 'TransactionsTable',

  components: { BoxDropdown, TableBoard },

  props: {
    transactions: {
      type: Array,
      default: Array,
    },
  },

  data() {
    return {
      currentHead: 1,
    }
  },

  computed: {
    currentHeadName() {
      let name = ''

      this.$options.tableMenu.some((item) => {
        name = item.name

        return item.value === this.currentHead
      })

      return name
    },
  },

  methods: {
    selectColumn(value, fn = null) {
      this.currentHead = value

      if (fn) {
        fn()
      }
    },

    isNegativeSum(value) {
      const result = parseInt(value)

      return result < 0
    },

    checkFiles(files) {
      return Array.isArray(files) && files?.length > 0
    },

    priceFormat(price) {
      return this.$priceFormat(price)
    },

    dateFormat(date) {
      return this.$dateFormat(date)
    },
  },

  tableMenu: [
    {
      name: 'Название',
      value: 0,
    },
    {
      name: 'Статус',
      value: 1,
    },
    {
      name: 'Сумма',
      value: 2,
    },
    {
      name: 'Дата',
      value: 3,
    },
  ],
}
</script>
