<template>
  <security-form title="Сброс проверки безопасности">
    <security-reset />
  </security-form>
</template>

<script>
import SecurityForm from '@/components/security/security-form'
import SecurityReset from '@/components/security/security-reset'
export default {
  name: 'SecurityResetPage',

  components: { SecurityReset, SecurityForm },

  layout: 'auth-layout',
}
</script>
