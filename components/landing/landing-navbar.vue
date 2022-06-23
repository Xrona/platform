<template>
  <div class="landing-navbar">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="7"
          offset-md="2"
          class="pa-0 navbar-list"
          :class="{ active: showed }"
        >
          <div class="navbar-close">
            <button @click="showed = !showed">
              <svg-icon name="burger-close" />
            </button>
          </div>
          <ul>
            <li>
              <nuxt-link to="/documents" class="button-link"
                >Документы</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/" class="button-link">Объекты</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="button-link">О компании</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="button-link">Новости</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="button-link">Как это работает</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/" class="button-link">Контакты</nuxt-link>
            </li>
          </ul>
          <div class="navbar-contacts">
            <a class="button-link" :href="`tel:${phone}`">{{ phone }}</a>
            <button>Заказать обратный звонок</button>
          </div>
        </v-col>
        <v-col cols="12" md="3" class="py-0">
          <div class="navbar-auth">
            <div class="navbar-burger">
              <button @click="showed = !showed"><span></span></button>
            </div>
            <nuxt-link to="/login/register" class="button-link">
              Регистрация
            </nuxt-link>
            <nuxt-link to="/login" class="box-button main-button">
              Войти
            </nuxt-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LandingNavbar',

  data() {
    return {
      showed: false,
      phone: '+7 999 9999 99 99',
    }
  },
}
</script>
