<template>
  <v-row class="bid-guest">
    <v-col cols="12" class="py-0">
      <h1 class="bid-guest__title">Заявки</h1>
      <p class="bid-guest__text">
        Пройдите
        <span>
          <svg-icon name="verification-fill" width="24" height="24" />
          верификацию
        </span>
        как заёмщик, чтобы получить доступ к разделу заявки
      </p>
      <nuxt-link to="/lk/verification" class="box-button main-button">
        <svg-icon name="verification-fill" width="24" height="24" />
        Пройти верификацию
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BidGuest',
}
</script>
