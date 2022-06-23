<template>
  <div class="users-head">
    <box-dropdown class="users-head__type">
      <template #target>
        <svg-icon :name="userType.icon" />
        <span class="type-target">
          {{ userType.name }}
        </span>
      </template>
      <template #menu="{ className, closeMenu }">
        <template v-for="type in $options.userTypes">
          <button :key="type.name" :class="className">
            <svg-icon :name="type.icon" />
            {{ type.name }}
          </button>
        </template>
      </template>
    </box-dropdown>
    <box-dropdown class="users-head__status white-dropdown">
      <template #target>
        <svg-icon :name="status.icon" />
        <span class="status-target">
          {{ status.name }}
        </span>
      </template>
      <template #menu="{ className, closeMenu }">
        <template v-for="item in $options.statusList">
          <button :key="item.name" :class="className">
            <svg-icon :name="item.icon" />
            {{ item.name }}
          </button>
        </template>
      </template>
    </box-dropdown>
    <text-input prefix-icon="zoom-outlined" :fill="false" placeholder="Поиск" />
  </div>
</template>

<script>
import BoxDropdown from '@/components/common/box-dropdown'
import TextInput from '@/components/common/text-input'
export default {
  name: 'UsersHead',

  components: { TextInput, BoxDropdown },

  data() {
    return {
      status: this.$options.statusList[0],
      userType: this.$options.userTypes[0],
    }
  },

  statusList: [
    {
      id: 0,
      name: 'Все статусы',
      icon: 'success',
    },
    {
      id: 0,
      name: 'Зарегистрированные',
      icon: 'success',
    },
    {
      id: 0,
      name: 'На проверке',
      icon: 'key',
    },
    {
      id: 0,
      name: 'Верифицированные',
      icon: 'verification-alt',
    },
  ],

  userTypes: [
    {
      id: 0,
      name: 'Все пользователи',
      icon: 'many-users',
    },
    {
      id: 1,
      name: 'Инвесторы',
      icon: 'users',
    },
    {
      id: 2,
      name: 'Заёмщики',
      icon: 'profile',
    },
  ],
}
</script>
