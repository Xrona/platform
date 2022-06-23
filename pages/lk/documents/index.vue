<template>
  <div class="documents">
    <documents-head />
    <documents-content :documents="documents" />
    <template v-if="pages">
      <v-row>
        <v-col cols="12" class="py-0">
          <button class="documents__more" @click="showMoreDocuments">
            Показать больше
          </button>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DocumentsHead from '@/components/documents/documents-head'
import DocumentsContent from '@/components/documents/documents-content'
export default {
  name: 'DocumentsPage',

  components: { DocumentsContent, DocumentsHead },

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.getDocuments({}).then(() => this.$nuxt?.$loading?.finish())
  },

  computed: {
    ...mapGetters('documents', ['pages', 'documents', 'currentPage', 'sort']),
  },

  methods: {
    ...mapActions('documents', ['getDocuments']),

    async showMoreDocuments() {
      await this.getDocuments({ sort: this.sort, page: this.page + 1 })
    },
  },
}
</script>
