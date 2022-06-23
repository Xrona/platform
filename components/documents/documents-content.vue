<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <div class="documents__table">
        <div class="table-column table-head">
          <div>#</div>
          <div>Наименование</div>
          <div class="table-head__sm">Тип</div>
          <div class="table-head__sm">Статус</div>
          <div class="table-head__sm">Сумма</div>
          <div class="table-head__sm">Дата</div>
          <div class="table-head__sm"></div>
          <box-dropdown>
            <template #target>
              <span>{{ currentColumnName }}</span>
            </template>
            <template #menu="{ className, closeMenu }">
              <template v-for="column in $options.columns">
                <button
                  :key="column.name"
                  :class="className"
                  @click="selectColumn(column.value, closeMenu)"
                >
                  {{ column.name }}
                </button>
              </template>
            </template>
          </box-dropdown>
        </div>
        <template v-for="(document, idx) in documents">
          <div :key="`docuemntObject-${idx}`" class="table-column">
            <div class="table-column__count">{{ idx + 1 }}</div>
            <div>{{ document.object.name }}</div>
            <template v-if="currentColumn === 0">
              <div class="table-column__xs">{{ document.typeLabel }}</div>
            </template>
            <template v-if="currentColumn === 1">
              <div class="table-column__xs">{{ document.statusLabel }}</div>
            </template>
            <template v-if="currentColumn === 2">
              <div class="table-column__xs table-column__price">
                +{{ document.sum }}/руб
              </div>
            </template>
            <template v-if="currentColumn === 3">
              <div class="table-column__xs">
                {{ formattedDate(document.createdAt) }}
              </div>
            </template>
            <div class="table-column__sm">{{ document.typeLabel }}</div>
            <div class="table-column__sm">{{ document.statusLabel }}</div>
            <div class="table-column__sm table-column__price">
              {{ document.sum }}
            </div>
            <div class="table-column__sm">
              {{ formattedDate(document.createdAt) }}
            </div>
            <div class="table-column__sm table-column__button">
              <icon-button icon="file-save" />
            </div>
          </div>
        </template>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import BoxDropdown from '~/components/common/box-dropdown'
import IconButton from '~/components/common/icon-button'
export default {
  name: 'DocumentsContent',

  components: { IconButton, BoxDropdown },

  columns: [
    {
      name: 'Тип',
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

  props: {
    documents: {
      type: Array,
      default: Array,
    },
  },

  data() {
    return {
      currentColumn: 0,
    }
  },

  computed: {
    currentColumnName() {
      let name = ''
      this.$options.columns.some((elem) => {
        name = elem.name

        return this.currentColumn === elem.value
      })

      return name
    },
  },

  methods: {
    selectColumn(idx, fn) {
      this.currentColumn = idx

      fn()
    },

    formattedDate(date) {
      if (date !== '') {
        return this.$dateFormat(date)
      }

      return date
    },
  },
}
</script>
