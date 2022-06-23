<template>
  <div class="main-footer">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="order-last order-sm-first">
          <h3 class="main-footer__title title-information">Информация</h3>
          <p class="main-footer__information">
            <span>ООО «7 Прудов инвестиции»</span>
            <span>ИНН: 6670503917</span>
            <span>ОГРН: 1216600053878</span>
            <span>Юр. адрес: 620075, Свердловская область,</span>
            <span>г Екатеринбург, ул Тургенева, д. 11, кв. 2</span>
          </p>
          <div class="main-footer__invest-info-xs"></div>
          <p class="main-footer__copyright">2021 Все права защищены</p>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <h3 class="main-footer__title">Контакты</h3>
          <div class="main-footer__contact-links">
            <a href="#">
              <svg-icon
                name="mail"
                width="20px"
                height="18px"
                style="margin: 3px 2px"
              />
              example@mail.ru
            </a>
            <a href="#">
              <svg-icon
                name="phone"
                width="20px"
                height="20px"
                style="margin: 2px"
              />
              +7 (495) 255 - 55 - 00
            </a>
          </div>
          <div class="main-footer__invest-info"></div>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="py-0">
          <h3 class="main-footer__title title-documents">Документы</h3>
          <div class="main-footer__documents-links">
            <nuxt-link to="/">Документы платформы</nuxt-link>
            <nuxt-link to="/">Раскрытие информации</nuxt-link>
            <nuxt-link to="/">Пользовательское соглашение</nuxt-link>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'MainFooter',
}
</script>
