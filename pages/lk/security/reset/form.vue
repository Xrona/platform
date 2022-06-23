<template>
  <security-form title="Вы запрашиваете выполнение следующих действий:">
    <security-actions />
  </security-form>
</template>

<script>
import SecurityForm from '@/components/security/security-form'
import SecurityActions from '@/components/security/security-actions'
export default {
  name: 'SecurityResetFormPage',

  components: { SecurityActions, SecurityForm },

  layout: 'auth-layout',
}
</script>
