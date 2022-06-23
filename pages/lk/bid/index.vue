<template>
  <div class="bid">
    <template v-if="isGuest">
      <bid-guest />
    </template>
    <template v-else>
      <v-row>
        <v-col class="py-0" cols="12">
          <bid-head v-model="options" />
        </v-col>
        <template v-for="application in applications">
          <v-col :key="application.name" cols="12" md="4" sm="6" class="py-0">
            <data-card :content="application">
              <template #button>
                <box-button text="отменить" class="main-button" />
              </template>
            </data-card>
          </v-col>
        </template>
        <template v-if="havePages">
          <v-col class="py-0" cols="12">
            <box-button
              class="objects__button-more outline-button"
              text="Показать больше"
              @click="
                getApplications({
                  page: pages.currentPage + 1,
                  ...options,
                })
              "
            />
          </v-col>
        </template>
      </v-row>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BidHead from '@/components/bid/bid-head'
import DataCard from '@/components/common/data-card'
import BoxButton from '@/components/common/box-button'
import UserRoleEnum from '@/enums/user-role'
import BidGuest from '@/components/bid/bid-guest'

export default {
  name: 'BidPage',

  components: { BidGuest, BoxButton, DataCard, BidHead },

  data() {
    return {
      options: {
        filter: null,
        sort: null,
      },
    }
  },

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.getApplications({
      page: 1,
    }).then(() => this.$nuxt.$loading.finish())
  },

  computed: {
    ...mapGetters('applications', ['applications', 'pages']),

    isGuest() {
      return this.$auth?.user?.role?.id === UserRoleEnum.GUEST
    },

    havePages() {
      return this.pages.currentPage < this.pages.lastPage
    },
  },

  watch: {
    options(value) {
      this.getApplications({
        page: 1,
        sort: this.options.sort,
        filter: this.options.filter,
      })
    },
  },

  methods: {
    ...mapActions('applications', ['getApplications']),
  },
}
</script>
