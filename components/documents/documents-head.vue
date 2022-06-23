<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <div class="documents__head">
        <h1>Документы</h1>
        <icon-button icon="file-save" />
        <period-buttons v-model="selectSort" class="documents__head__sort" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import IconButton from '@/components/common/icon-button'
import PeriodButtons from '@/components/common/period-buttons'
export default {
  name: 'DocumentsHead',

  components: { PeriodButtons, IconButton },

  computed: {
    ...mapGetters('documents', ['sort']),

    selectSort: {
      get() {
        return this.sort
      },
      set(value) {
        this.setSortHandler(value)
      },
    },
  },

  methods: {
    ...mapMutations('documents', ['setSort']),
    ...mapActions('documents', ['getDocuments']),

    async setSortHandler(value) {
      await this.setSort(value)
      await this.getDocuments({ sort: value })
    },
  },
}
</script>
