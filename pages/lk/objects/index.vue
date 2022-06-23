<template>
  <div class="objects">
    <v-row>
      <v-col class="py-0" cols="12">
        <h1>Объекты</h1>
      </v-col>
      <template v-for="objectData in objects">
        <v-col :key="objectData.name" cols="12" md="4" sm="6" class="py-0">
          <data-card :content="objectData">
            <template #button>
              <box-button
                text="Подробнее"
                class="main-button"
                @click="pushDetails(objectData.id)"
              />
            </template>
          </data-card>
        </v-col>
      </template>
      <template v-if="havePages">
        <v-col cols="12" class="py-0">
          <box-button
            class="objects__button-more outline-button"
            text="Показать больше"
            @click="getObjects(pages.currentPage + 1)"
          />
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DataCard from '@/components/common/data-card'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'ObjectsPage',

  components: { BoxButton, DataCard },

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.getObjects().then(() => this.$nuxt?.$loading?.finish())
  },

  computed: {
    ...mapGetters('objects', ['objects', 'pages']),

    havePages() {
      return this.pages.currentPage < this.pages.lastPage
    },
  },

  beforeDestroy() {
    this.clearState()
  },

  methods: {
    ...mapActions('objects', ['getObjects']),
    ...mapMutations('objects', ['clearState']),

    pushDetails(id) {
      this.$router.push(`objects/${id}`)
    },
  },
}
</script>
