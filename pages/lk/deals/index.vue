<template>
  <div class="deals">
    <v-row>
      <deals-head v-model="dealsOptions" />
      <template v-for="deal in deals">
        <v-col
          :key="`dealsCard-${deal.name}`"
          class="py-0"
          cols="12"
          md="4"
          sm="6"
        >
          <data-card :content="deal">
            <template #button>
              <box-button text="Отменить" class="main-button" />
            </template>
          </data-card>
        </v-col>
      </template>
      <template v-if="pages">
        <v-col class="py-0" cols="12">
          <box-button
            text="Показать больше"
            class="deals__button-more outline-button"
            @click="nextPage"
          />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DealsHead from '@/components/deals/deals-head'
import DataCard from '@/components/common/data-card'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'DealsPage',

  components: { BoxButton, DataCard, DealsHead },

  async fetch() {
    this.$nuxt?.$loading?.start()

    await this.getDeals().then(() => this.$nuxt.$loading?.finish())
  },

  computed: {
    ...mapGetters('deals', ['deals', 'options', 'pages', 'currentPage']),

    dealsOptions: {
      get() {
        return this.options
      },
      set(value) {
        this.setOptions(value)
        this.getDealsHandler()
      },
    },
  },

  methods: {
    ...mapActions('deals', ['getDeals']),
    ...mapMutations('deals', ['setOptions']),

    async getDealsHandler() {
      await this.getDeals()
    },

    async nextPage() {
      if (this.pages) {
        await this.getDeals(this.currentPage + 1)
      }
    },
  },
}
</script>
