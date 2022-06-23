<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Данной страницы не существует</h1>
    <h1 v-else>Что-то пошло не так...</h1>
    <a :href="href">Вернуться на главную</a>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',

  props: {
    error: {
      type: Object,
      default: Object,
    },
  },

  data: () => ({
    href: '/',
  }),
}
</script>
