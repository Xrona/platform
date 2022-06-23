<template>
  <div class="mobile-menu">
    <nuxt-link to="/">
      <svg-icon name="compass" />
      <span>Объекты</span>
    </nuxt-link>
    <nuxt-link to="/">
      <svg-icon name="file" />
      <span>Докумсенты</span>
    </nuxt-link>
    <nuxt-link to="/">
      <svg-icon name="attention" />
      <span>О компании</span>
    </nuxt-link>
    <nuxt-link to="/">
      <svg-icon name="question" />
      <span>Как это работает</span>
    </nuxt-link>
    <nuxt-link to="/">
      <svg-icon name="doc" />
      <span>Новости</span>
    </nuxt-link>
    <nuxt-link to="/">
      <svg-icon name="phone" />
      <span>Контакты</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
}
</script>
