<template>
  <security-form :title="title">
    <security-check />
  </security-form>
</template>

<script>
import SecurityForm from '@/components/security/security-form'
import SecurityCheck from '@/components/security/security-check'
export default {
  name: 'SecurityPage',

  components: { SecurityForm, SecurityCheck },

  layout: 'auth-layout',

  computed: {
    title() {
      return 'Проверка безопасности'
    },
  },
}
</script>
