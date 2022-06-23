<template>
  <div class="bid-edit">
    <v-row>
      <v-col class="py-0" cols="12">
        <h1>Редактирование заявки</h1>
      </v-col>
    </v-row>
    <bid-form />
    <v-row class="justify-end">
      <v-col class="py-0" cols="12" md="2">
        <box-button text="Сохранить" @click="save" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BidForm from '@/components/bid/bid-form'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'BidEditPage',

  components: { BoxButton, BidForm },

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.getApplication(this.id).then(async () => {
      await this.loadFormData().then(() => this.$nuxt.$loading.finish())
    })
  },

  computed: {
    id() {
      return this.$route.params.bid_id
    },
  },

  methods: {
    ...mapActions('application', ['getApplication', 'loadFormData', 'update']),

    async save() {
      const res = await this.update(this.id)

      if (res) {
        await this.$router.push(`/bid/${this.id}`)
      }
    },
  },
}
</script>
