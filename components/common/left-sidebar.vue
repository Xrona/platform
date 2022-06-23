<template>
  <div class="left-sidebar" :class="{ showed: menu }">
    <transition name="opacity">
      <template v-if="menu">
        <div class="fade" @click.self="setMenu(false)"></div>
      </template>
    </transition>
    <div class="left-sidebar__profile">
      <img
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="Profile Image"
      />
      <h3>{{ user.fullName }}</h3>
      <span>{{ user.role }}</span>
    </div>
    <ul>
      <template v-for="link in $options.sidebarLinks">
        <li
          :key="link.name"
          class="left-sidebar__item"
          :class="{
            active: active(link),
          }"
          @click="goToUrl(link.url, link.pageName)"
        >
          <v-tooltip right>
            <template #activator="{ on, attrs }">
              <span class="icon-container" v-bind="attrs" v-on="on">
                <svg-icon :name="link.icon" :style="link.style" />
              </span>
            </template>
            <span class="left-sidebar__item__tooltip">{{ link.name }}</span>
          </v-tooltip>
          <span class="link-text">{{ link.name }} </span>
          <template
            v-if="
              link.pageName === $options.pageEnum.NOTIFICATIONS && count > 0
            "
          >
            <span class="notification">{{ count }}</span>
          </template>
        </li>
      </template>
      <template v-if="isAdmin">
        <li class="left-sidebar__item" @click="goToUrl('/lk/users')">
          <v-tooltip right>
            <template #activator="{ on, attrs }">
              <span class="icon-container" v-bind="attrs" v-on="on">
                <svg-icon
                  name="users"
                  :fill="false"
                  width="15.42"
                  height="14.64"
                />
              </span>
            </template>
            <span class="left-sidebar__item__tooltip">Пользователи</span>
          </v-tooltip>
          <span class="link-text">Пользователи</span>
        </li>
      </template>
    </ul>
    <div class="left-sidebar__options">
      <template v-for="option in $options.optionsLinks">
        <template v-if="option.pageName === 'logout'">
          <button
            :key="option.name"
            class="left-sidebar__item"
            :class="{
              active: active(option),
            }"
            @click="logout"
          >
            <v-tooltip right>
              <template #activator="{ on, attrs }">
                <span class="icon-container" v-bind="attrs" v-on="on">
                  <svg-icon :name="option.icon" :style="option.style" />
                </span>
              </template>
              <span class="left-sidebar__item__tooltip">{{ option.name }}</span>
            </v-tooltip>
            <span class="link-text">{{ option.name }}</span>
          </button>
        </template>
        <template v-else>
          <button
            :key="option.name"
            class="left-sidebar__item"
            :class="{
              active: active(option),
            }"
            @click="goToUrl(option.url)"
          >
            <v-tooltip right>
              <template #activator="{ on, attrs }">
                <span class="icon-container" v-bind="attrs" v-on="on">
                  <svg-icon :name="option.icon" :style="option.style" />
                </span>
              </template>
              <span class="left-sidebar__item__tooltip">{{ option.name }}</span>
            </v-tooltip>
            <span class="link-text">{{ option.name }}</span>
          </button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import PagesEnum from '~/enums/pages'
import UserRoleEnum from '@/enums/user-role'

export default {
  name: 'LeftSidebar',

  data() {
    return {
      selectedLink: 6,
    }
  },

  computed: {
    ...mapState('menu', ['menu']),
    ...mapState('notifications', ['count']),

    user() {
      const name = this.$auth.user?.user_profile?.name ?? ''
      const surname = this.$auth.user?.user_profile?.surname ?? ''
      const patronymic = this.$auth.user?.user_profile?.patronymic ?? ''
      const role = this.$auth.user?.role?.label ?? ''

      return {
        fullName: `${name} ${surname}`,
        name,
        surname,
        patronymic,
        role,
      }
    },

    isAdmin() {
      const roleId = this.$auth?.user?.role?.id

      if (roleId === UserRoleEnum.ADMIN || roleId === UserRoleEnum.MODERATOR) {
        return true
      }

      return false
    },
  },

  methods: {
    ...mapMutations('menu', ['setMenu']),

    goToUrl(url, name) {
      console.log(name, this.$route.name)

      this.setMenu(false)
      this.$router.push(url)
    },

    async logout() {
      await this.$auth.logout().then(() => this.$router.push('/login'))
    },

    active(option) {
      return (
        this.$route.name === option.pageName ||
        this.$route.path.includes(option.pageName)
      )
    },
  },

  pageEnum: PagesEnum,

  sidebarLinks: [
    {
      name: 'Сводка',
      pageName: PagesEnum.SUMMARY,
      url: '/lk/dashboard',
      icon: 'bag-outlined',
      style: {
        width: '16.66px',
        height: '16.45px',
      },
    },
    {
      name: 'Объекты',
      pageName: PagesEnum.OBJECTS,
      url: '/lk/objects',
      icon: 'compass-outlined',
      style: {
        width: '16.66px',
        height: '16.66px',
      },
    },
    {
      name: 'Сделки',
      pageName: PagesEnum.DEALS,
      url: '/lk/deals',
      icon: 'circle-diagram-outlined',
      style: {
        width: '16.66px',
        height: '16.45px',
      },
    },
    {
      name: 'Заявки',
      pageName: PagesEnum.BID,
      url: '/lk/bid',
      icon: 'diagram-outlined',
      style: {
        width: '16.66px',
        height: '16.45px',
      },
    },
    {
      name: 'Транзакции',
      pageName: PagesEnum.TRANSACTIONS,
      url: '/lk/transactions',
      icon: 'swap-alternative',
      style: {
        width: '15.07px !important',
        height: '13.61px !important',
        stroke: 'currentColor',
        fill: 'none',
      },
    },
    {
      name: 'Документы',
      pageName: PagesEnum.DOCUMENTS,
      url: '/lk/documents',
      icon: 'doc-outlined',
      style: {
        width: '16.66px',
        height: '16.45px',
      },
    },
    {
      name: 'Верификация',
      pageName: PagesEnum.VERIFICATION,
      url: '/lk/verification',
      icon: 'verification',
      style: {
        width: '16.66px',
        height: '16.45px',
      },
    },
    {
      name: 'Уведомления',
      pageName: PagesEnum.NOTIFICATIONS,
      url: '/lk/notifications',
      icon: 'notification',
      style: {
        width: '14.17px',
        height: '16.67px',
        fill: 'none',
        stroke: 'currentColor',
      },
    },
  ],

  optionsLinks: [
    {
      name: 'Настройки',
      pageName: PagesEnum.SETTINGS,
      url: '/lk/settings',
      icon: 'cog',
      style: {
        width: '13.37px !important',
        height: '14.25px !important',
        margin: '1.2px',
      },
    },
    {
      name: 'Как это работает?',
      pageName: PagesEnum.HOW_IT_WORKS,
      url: '/lk',
      icon: 'question-outlined',
      style: {
        width: '17.92px !important',
        height: '17.92px !important',
      },
    },
    {
      name: 'Выйти',
      pageName: 'logout',
      url: '/logout',
      icon: 'logout',
      style: {
        width: '15.86px !important',
        height: '15.42px !important',
        fill: 'none',
        stroke: 'currentColor',
      },
    },
  ],
}
</script>
