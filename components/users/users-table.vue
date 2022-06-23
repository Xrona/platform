<template>
  <table-board class="users__table" :items="users" @clickToRow="clickToRow">
    <template #tableHead>
      <template v-for="(itemHead, idx) in $options.menuList">
        <div
          :key="`usersTableHead${itemHead.name}`"
          :class="{
            'users__table__head-xs': idx > 0 && idx < 3,
            'users__table__head-sm': idx > 2,
          }"
        >
          {{ itemHead.name }}
        </div>
      </template>
      <box-dropdown class="users__table__head-dropdown">
        <template #target>
          <span>{{ selectedTab }}</span>
        </template>
        <template #menu="{ className, closeMenu }">
          <template v-for="(itemHead, idx) in $options.menuList">
            <button
              v-if="idx !== 0"
              :key="`usersTableHeadDropdown${itemHead.name}`"
              :class="
                idx < 2
                  ? `users__table__head-dropdown-sm ${className}`
                  : className
              "
              @click="selectTab(itemHead.value, closeMenu)"
            >
              {{ itemHead.name }}
            </button>
          </template>
        </template>
      </box-dropdown>
    </template>
    <template #content="{ row }">
      <div>{{ getFullName(row) }}</div>
      <div class="users__table__item-sm">
        {{ row.email }}
      </div>
      <div class="users__table__item-sm">
        <input v-mask="'+# (###) ### ##-##'" disabled :value="row.phone" />
      </div>
      <div class="users__table__item-md">
        {{ row.role }}
      </div>
      <div class="users__table__item-md">
        {{ row.status }}
      </div>
      <div class="users__table__item-md">
        <div class="col-button">
          {{ row.deals }}
          <nuxt-link :to="`/lk/users/${row.id}`">
            <svg-icon
              name="edit-outlined"
              width="11.4"
              height="11.3"
              :fill="false"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="users__table__item-filter">
        <template v-if="tab === 1">
          {{ row.email }}
        </template>
        <template v-if="tab === 2">
          <!--          <input v-mask="'+# (###) ### ##-##'" disabled :value="row.phone" />-->
        </template>
        <template v-if="tab === 3">
          {{ row.type }}
        </template>
        <template v-if="tab === 4">
          {{ row.status }}
        </template>
        <template v-if="tab === 5">
          {{ row.deals }}
        </template>
      </div>
    </template>
  </table-board>
</template>

<script>
import { mapGetters } from 'vuex'
import TableBoard from '@/components/common/table-board'
import BoxDropdown from '@/components/common/box-dropdown'
export default {
  name: 'UsersTable',

  components: { BoxDropdown, TableBoard },

  data() {
    return {
      tab: 1,
    }
  },

  computed: {
    ...mapGetters('users', ['users']),

    selectedTab() {
      const item = this.$options.menuList.find(
        (item) => item.value === this.tab
      )

      return item.name
    },
  },

  methods: {
    selectTab(value, fn = null) {
      this.tab = value

      if (fn) {
        fn()
      }
    },

    getFullName(user) {
      return `${user?.surname} ${user?.name[0]}.${user?.patronymic[0]}.`
    },

    clickToRow(row) {
      if (row?.id && window.screen.width < 944) {
        this.$router.push(`/lk/users/${row.id}`)
      }
    },
  },

  menuList: [
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
      name: 'Статус',
      value: 4,
    },
    {
      name: 'Сделки',
      value: 5,
    },
  ],
}
</script>
