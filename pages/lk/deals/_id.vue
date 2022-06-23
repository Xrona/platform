<template>
  <div class="one-object">
    <v-row>
      <v-col cols="5" class="py-0 one-object__title">
        <h1>Объекты</h1>
      </v-col>
      <v-col cols="12" md="7" class="py-0 one-object__back">
        <back-button />
      </v-col>
      <v-col col="12" md="5" class="py-0 d-none d-md-block">
        <data-list>
          <template v-for="deal in deals">
            <list-object :key="`listObject${deal.name}`" :options="deal" />
          </template>
        </data-list>
      </v-col>
      <v-col cols="12" md="7" class="py-0">
        <object-content />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DataList from '@/components/common/data-list'
import ListObject from '@/components/objects/list-object'
import BackButton from '@/components/common/back-button'
import ObjectContent from '@/components/objects/object-content'
export default {
  name: 'DealId',

  components: { DataList, ListObject, BackButton, ObjectContent },

  async fetch() {
    this.$nuxt?.loading?.start()

    await this.getDeals().then(async () => {
      await this.$nuxt?.$loading?.finish()
    })
  },

  computed: {
    ...mapGetters('deals', ['deals']),
  },

  methods: {
    ...mapActions('deals', ['getDeals']),
  },
}
</script>
