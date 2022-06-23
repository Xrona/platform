<template>
  <v-row class="verification">
    <v-col>
      <h1>Верификация</h1>
      <div class="verification__category">
        <nuxt-link to="/lk/verification/investor" class="box-button main-button"
          >Я - Инвестор</nuxt-link
        >
        <nuxt-link to="/lk/verification/borrower" class="box-button main-button"
          >Я - Заёмщик</nuxt-link
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'VerificationPage',
}
</script>
