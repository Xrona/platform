<template>
  <verification-content />
</template>

<script>
import { mapActions } from 'vuex'
import VerificationRoleEnum from '@/enums/verification-role'
import VerificationContent from '@/components/verification/verification-content'

export default {
  name: 'BorrowerPage',

  components: { VerificationContent },

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.loadFormData(VerificationRoleEnum.BORROWER).then(() =>
      this.$nuxt.$loading.finish()
    )
  },

  methods: {
    ...mapActions('verification', ['loadFormData']),
  },
}
</script>
