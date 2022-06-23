<template>
  <v-row class="settings__access">
    <v-col cols="12" sm="6" md="4" lg="3" class="py-0">
      <box-dropdown>
        <template #target>
          <svg-icon :name="currentUserCategoryItem.icon" />
          <span>{{ currentUserCategoryItem.name }}</span>
        </template>
        <template #menu="{ closeMenu, className }">
          <template v-for="category in $options.userCategory">
            <button
              :key="category.name"
              :class="className"
              @click="selectCategory(category.id, closeMenu)"
            >
              <svg-icon :name="category.icon" />
              <span>{{ category.name }}</span>
            </button>
          </template>
          <template v-if="isAdmin">
            <button :class="className" @click="addNewUser(closeMenu)">
              <svg-icon name="add-user" />
              <span>Добавить пользователя</span>
            </button>
          </template>
        </template>
      </box-dropdown>
    </v-col>
    <!--    <v-col cols="12" sm="6" md="4" lg="3">-->
    <!--      &lt;!&ndash;      <box-dropdown class="white-dropdown">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <template #target>&ndash;&gt;-->
    <!--      &lt;!&ndash;          <span>Действия</span>&ndash;&gt;-->
    <!--      &lt;!&ndash;        </template>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </box-dropdown>&ndash;&gt;-->
    <!--    </v-col>-->
    <v-col cols="12" md="5" offset-md="3" offset-lg="4" class="py-0">
      <text-input
        v-model="searchInput"
        class="settings__access__search"
        prefix-icon="zoom-outlined"
        input-id="userSearch"
      />
    </v-col>
    <v-col cols="12" class="py-0">
      <table-board class="settings__access__table" :items="users">
        <template #tableHead>
          <template v-for="itemHead in $options.tableMenu">
            <div
              :key="`settingsAccessTH${itemHead.name}`"
              class="table-head"
              :class="{
                'column-sm': itemHead.value > 0,
                'column-md': itemHead.value > 2,
              }"
            >
              {{ itemHead.name }}
            </div>
          </template>
          <box-dropdown class="white-dropdown px-2">
            <template #target>
              <span>{{ currentHeadName }}</span>
            </template>
            <template #menu="{ closeMenu, className }">
              <template v-for="(itemHead, idx) in $options.tableMenu">
                <template v-if="idx !== 0 && idx !== currentHead">
                  <button
                    :key="`settingsAccessTHBD-${itemHead.name}`"
                    class="table-head"
                    :class="
                      idx < 3
                        ? `column-xs  ${className}`
                        : `column-sm ${className}`
                    "
                    @click="selectColumn(itemHead.value, closeMenu)"
                  >
                    {{ itemHead.name }}
                  </button>
                </template>
              </template>
            </template>
          </box-dropdown>
        </template>
        <template #content="{ row }">
          <div class="table-column cursor-pointer" @click="showUser(row.id)">
            {{ row.name }}
          </div>
          <div class="table-column column-sm">{{ row.email }}</div>
          <div class="table-column column-sm">{{ row.phone }}</div>
          <div class="table-column column-md">{{ row.role }}</div>
          <div class="table-column column-md">{{ row.date }}</div>
          <div class="table-column column-md">
            <button @click="showUser(row.id)">
              <svg-icon name="file" width="24" height="24" />
            </button>
          </div>
          <template v-if="currentHead === 1">
            <div class="table-column column-xs d-md-none">{{ row.email }}</div>
          </template>
          <template v-if="currentHead === 2">
            <div class="table-column column-xs d-md-none">{{ row.phone }}</div>
          </template>
          <template v-if="currentHead === 3">
            <div class="table-column column-sm d-md-none">{{ row.role }}</div>
          </template>
          <template v-if="currentHead === 4">
            <div class="table-column column-sm d-md-none">{{ row.date }}</div>
          </template>
        </template>
      </table-board>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { debounce } from 'lodash'
import BoxDropdown from '~/components/common/box-dropdown'
import TextInput from '~/components/common/text-input'
import TableBoard from '~/components/common/table-board'
import UserRoleEnum from '@/enums/user-role'

export default {
  name: 'SettingsAccess',

  components: { TableBoard, TextInput, BoxDropdown },

  props: {
    users: {
      type: Array,
      default: Array,
    },
  },

  data() {
    return {
      search: '',
      currentHead: 3,
      currentUserCategory: null,
    }
  },

  computed: {
    searchInput: {
      get() {
        return this.search
      },
      set(value) {
        this.search = value
        this.finishInput()
      },
    },

    isAdmin() {
      const userRole = this.$auth.user?.role?.id

      return userRole === UserRoleEnum.ADMIN
    },

    currentHeadName() {
      let name = ''

      this.$options.tableMenu.some((item) => {
        name = item.name

        return item.value === this.currentHead
      })

      return name
    },

    currentUserCategoryItem() {
      return this.$options.userCategory.find((item) => {
        return item.id === this.currentUserCategory
      })
    },
  },

  methods: {
    ...mapActions('users', ['getUsers']),

    finishInput: debounce(function () {
      this.getUsers({
        search: this.search,
        roles: this.currentUserCategory ? [this.currentUserCategory] : null,
      })
    }, 700),

    selectColumn(value, fn = null) {
      this.currentHead = value

      if (fn) {
        fn()
      }
    },

    selectCategory(category, fn = null) {
      this.currentUserCategory = category

      this.getUsers({
        roles: this.currentUserCategory ? [this.currentUserCategory] : null,
        search: this.search,
      })

      if (fn) {
        fn()
      }
    },

    addNewUser(fn = null) {
      this.$router.push('/lk/settings/user/new-user')

      if (fn) {
        fn()
      }
    },

    showUser(id) {
      this.$router.push(`/lk/settings/user/${id}`)
    },
  },

  userCategory: [
    {
      id: null,
      name: 'Все пользователи',
      icon: 'many-users',
    },
    {
      id: 'admin',
      name: 'Администраторы',
      icon: 'profile',
    },
    {
      id: 'moderator',
      name: 'Модераторы',
      icon: 'users',
    },
  ],

  tableMenu: [
    {
      name: 'Имя пользователя',
      value: 0,
    },
    {
      name: 'Email',
      value: 1,
    },
    {
      name: 'Телефон',
      value: 2,
    },
    {
      name: 'Тип',
      value: 3,
    },
    {
      name: 'Дата',
      value: 4,
    },
  ],

  items: [
    {
      id: 1,
      name: 'Попов С.С.',
      email: 'example@gmail.com',
      phone: '+79526595674',
      type: 'Инвестор',
      date: '05.05.2022',
    },
    {
      id: 1,
      name: 'Попов С.С.',
      email: 'example@gmail.com',
      phone: '+79526595674',
      type: 'Инвестор',
      date: '05.05.2022',
    },
    {
      id: 1,
      name: 'Попов С.С.',
      email: 'example@gmail.com',
      phone: '+79526595674',
      type: 'Инвестор',
      date: '05.05.2022',
    },
    {
      id: 1,
      name: 'Попов С.С.',
      email: 'example@gmail.com',
      phone: '+79526595674',
      type: 'Инвестор',
      date: '05.05.2022',
    },
    {
      id: 1,
      name: 'Попов С.С.',
      email: 'example@gmail.com',
      phone: '+79526595674',
      type: 'Инвестор',
      date: '05.05.2022',
    },
    {
      id: 1,
      name: 'Попов С.С.',
      email: 'example@gmail.com',
      phone: '+79526595674',
      type: 'Инвестор',
      date: '05.05.2022',
    },
  ],
}
</script>
