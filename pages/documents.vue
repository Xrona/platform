<template>
  <div class="landing">
    <h1>Документы платформы</h1>
    <template v-for="i in 10">
      <document-link :key="`documentLink${i}`" />
    </template>
  </div>
</template>

<script>
import DocumentLink from '@/components/landing/document-link'
export default {
  name: 'DocumentsPage',

  components: { DocumentLink },

  layout: 'landing',
}
</script>
