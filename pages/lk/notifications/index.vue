<template>
  <div class="notifications">
    <h1>Уведомления</h1>
    <div class="notifications__body">
      <!--      <div class="notifications__item error-notification">-->
      <!--        <div class="item-icon">-->
      <!--          <svg-icon name="notification-error" width="16" height="16" />-->
      <!--        </div>-->
      <!--        <h3 class="item-title">-->
      <!--          Инвестор Иванов Иван осуществил вклад на сумму 50000 р. в объект №-->
      <!--          321688-->
      <!--        </h3>-->
      <!--        <span class="item-date">03.04.2022 21:50</span>-->
      <!--      </div>-->
      <!--      <div class="notifications__item success-notification">-->
      <!--        <div class="item-icon">-->
      <!--          <svg-icon name="notification-group" heihgt="16" width="16" />-->
      <!--        </div>-->
      <!--        <h3 class="item-title">-->
      <!--          Инвестор Иванов Иван осуществил вклад на сумму 50000 р. в объект №-->
      <!--          321688-->
      <!--        </h3>-->
      <!--        <span class="item-date">03.04.2022 21:50</span>-->
      <!--      </div>-->
      <template v-for="notification in notifications">
        <div
          :key="notification.name"
          class="notifications__item success-notification"
        >
          <div class="item-icon">
            <svg-icon name="notification-group" heihgt="16" width="16" />
          </div>
          <h3 class="item-title">
            {{ notification.name }}
          </h3>
          <span class="item-date">{{ notification.date }}</span>
        </div>
      </template>
    </div>
    <box-button text="Показать больше" class="outline-button" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'NotificationsPage',

  components: { BoxButton },

  async fetch() {
    this.$nuxt?.$loading?.start()
    await this.listNotifications().then(() => this.$nuxt?.$loading?.finish())
  },

  computed: {
    ...mapState('notifications', ['notifications']),
  },

  methods: {
    ...mapActions('notifications', ['listNotifications']),
  },
}
</script>
