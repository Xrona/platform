<template>
  <div class="one-bid">
    <v-row>
      <v-col class="py-0 one-bid__nav" cols="12">
        <back-button @click="$router.back()" />
        <h1>Заявка №{{ id }}</h1>
        <div class="one-bid__nav__options">
          <box-button text="Редактировать">
            <template #icon>
              <svg-icon :height="18" :width="18" name="edit" />
            </template>
          </box-button>
          <box-button text="Сохранить">
            <template #icon>
              <svg-icon :height="18" :width="18" name="save" />
            </template>
          </box-button>
        </div>
      </v-col>
    </v-row>
    <bid-view />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import BidView from '@/components/bid/bid-view'
import BackButton from '@/components/common/back-button'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'BidId',

  components: { BoxButton, BackButton, BidView },

  async fetch() {
    this.$nuxt?.$loading?.start()

    await this.getApplication(this.id).then(async () => {
      await this.loadFormData().then(() => this.$nuxt?.$loading?.finish())
    })
  },

  computed: {
    id() {
      return this.$route.params.bid_id
    },
  },

  beforeDestroy() {
    this.clearState()
  },

  methods: {
    ...mapActions('application', ['getApplication', 'loadFormData']),
    ...mapMutations('application', ['clearState']),
  },
}
</script>
