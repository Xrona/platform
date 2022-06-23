<template>
  <div class="summary-guest">
    <div class="summary-guest__modal">
      <p>Для отображения данных требуется пройти верификацию</p>
      <nuxt-link to="/lk/verification" class="box-button main-button">
        Пройти верификацию
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryGuest',
}
</script>
