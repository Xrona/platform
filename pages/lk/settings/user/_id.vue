<template>
  <div class="settings-user">
    <v-row>
      <v-col cols="12" class="pt-0 pb-1">
        <div class="settings-user__head">
          <back-button @click="backHandler" />
          <h1>{{ roleFullName }}</h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="settings-user__data">
          <h3>Данные</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="surname"
          input-id="settingsUserName"
          label="Фамилия"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input v-model="name" input-id="settingsUserName" label="Имя" />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="patronymic"
          input-id="settingsUserName"
          label="Отчество"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="phone"
          v-mask="'+7 (###) ### ##-##'"
          input-id="settingsUserPhone"
          label="Телефон"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="email"
          input-id="settingsUserEmail"
          label="Email"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="oldPassword"
          input-id="settingsUserOldPassword"
          input-type="password"
          label="Введите старый пароль"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="newPassword"
          input-id="settingsUserNewPassword"
          input-type="password"
          label="Новый пароль"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0">
        <text-input
          v-model="correctNePassword"
          input-type="password"
          input-id="settingsUserRepeatPassword"
          label="Повторите новый пароль"
        />
      </v-col>
    </v-row>
    <access-sections :permissions="permissions" @change="setPermission" />
    <v-row>
      <v-col cols="12" sm="4" md="3" lg="2" class="py-0 d-flex align-end">
        <box-button
          text="Сохранить"
          class="with-icon settings-user__save"
          icon="success"
          @click="updateChanges"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pt-4">
        <div class="settings-user__logs">
          <h3>Логи собыитий</h3>
          <period-buttons />
        </div>
      </v-col>
      <v-col cols="12" class="pt-1 pb-4">
        <table-board :items="$options.table">
          <template #tableHead>
            <div>Название</div>
            <div class="column-sm">Тип события</div>
            <div class="column-sm">Дата</div>
            <box-dropdown class="d-sm-none">
              <template #target>
                <span></span>
              </template>
              <template #menu="{ className, closeMenu }">
                <template v-for="(item, idx) of $options.tableHead">
                  <button
                    v-if="idx > 0"
                    :key="`logTableItem${idx}`"
                    :class="className"
                    @click="selectColumn(item.id, closeMenu)"
                  >
                    {{ item.name }}
                  </button>
                </template>
              </template>
            </box-dropdown>
          </template>
          <template #content="{ row }">
            <div>{{ row.name }}</div>
            <div
              class="column-sm"
              :class="{ 'dynamic-column': currentColumn === 1 }"
            >
              {{ row.event }}
            </div>
            <div
              class="column-sm"
              :class="{ 'dynamic-column': currentColumn === 2 }"
            >
              {{ row.date }}
            </div>
          </template>
        </table-board>
      </v-col>
      <v-col cols="12" class="py-0">
        <box-button text="Показать больше" class="outline-button more-logs" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BackButton from '@/components/common/back-button'
import TextInput from '@/components/common/text-input'
import BoxButton from '@/components/common/box-button'
import AccessSections from '@/components/settings/access-sections'
import PeriodButtons from '@/components/common/period-buttons'
import TableBoard from '@/components/common/table-board'
import BoxDropdown from '@/components/common/box-dropdown'
import fetchMixin from '@/mixins/fetchMixin'
import SettingsEnum from '@/enums/settings'
export default {
  name: 'SettingsUserPage',

  components: {
    BoxDropdown,
    TableBoard,
    PeriodButtons,
    AccessSections,
    BoxButton,
    TextInput,
    BackButton,
  },

  mixins: [fetchMixin],

  data() {
    return {
      currentColumn: null,
    }
  },

  async fetch() {
    if (this.userId) {
      await this.fetchHandler(async () => {
        await this.getUser(this.userId)
        await this.getUserFormData()
      })
    }
  },

  computed: {
    ...mapGetters('user', ['user', 'permissions']),

    userId() {
      return this.$route.params?.id ?? null
    },

    roleFullName() {
      return `${this.user?.role ?? ''} ${this.fullName}`
    },

    fullName: {
      get() {
        return ` ${this.user?.surname ?? ''} ${this.user?.name ?? ''} ${
          this.user.patronymic ?? ''
        }`
      },
    },

    name: {
      get() {
        return this.user.name
      },
      set(value) {
        this.setProp({
          prop: 'name',
          value,
        })
      },
    },

    patronymic: {
      get() {
        return this.user.patronymic
      },
      set(value) {
        this.setProp({
          prop: 'patronymic',
          value,
        })
      },
    },

    surname: {
      get() {
        return this.user.surname
      },
      set(value) {
        this.setProp({
          prop: 'surname',
          value,
        })
      },
    },

    phone: {
      get() {
        return this.user.phone
      },
      set(value) {
        this.setProp({
          prop: 'phone',
          value,
        })
      },
    },

    oldPassword: {
      get() {
        return this.user.oldPassword
      },
      set(value) {
        this.setProp({
          prop: 'oldPassword',
          value,
        })
      },
    },

    password: {
      get() {
        return this.user.password
      },
      set(value) {
        this.setProp({
          prop: 'password',
          value,
        })
      },
    },

    confirmPassword: {
      get() {
        return this.user.confirmPassword
      },
      set(value) {
        this.setProp({
          prop: 'confirmPassword',
          value,
        })
      },
    },

    email: {
      get() {
        return this.user?.email ?? ''
      },
      set(value) {
        this.setProp({
          prop: 'email',
          value,
        })
      },
    },
  },

  mounted() {
    this.currentColumn = this.$options.tableHead[0].id
  },

  destroyed() {
    this.clearState()
  },

  methods: {
    ...mapActions('user', [
      'getUser',
      'getUserFormData',
      'updateSettingsByAdmin',
    ]),
    ...mapMutations('user', ['setProp', 'clearState', 'setPermission']),

    selectColumn(id, fn) {
      this.currentColumn = id

      if (fn) {
        fn()
      }
    },

    async updateChanges() {
      const result = await this.updateSettingsByAdmin(this.$route.params.id)

      if (result) {
        await this.$router.push({
          name: 'lk-settings',
          params: {
            tab: SettingsEnum.ACCESS,
          },
        })
      }
    },

    backHandler() {
      this.$router.push({
        name: 'lk-settings',
        params: {
          tab: SettingsEnum.ACCESS,
        },
      })
    },
  },

  tableHead: [
    {
      id: 0,
      name: 'Название',
    },
    {
      id: 1,
      name: 'Тип события',
    },
    {
      id: 2,
      name: 'Дата',
    },
  ],

  table: [
    {
      name: 'Попов Сергей Сергеевич',
      event: 'Удалил запись',
      date: '05.06.2022',
    },
    {
      name: 'Попов Сергей Сергеевич',
      event: 'Удалил запись',
      date: '05.06.2022',
    },
    {
      name: 'Попов Сергей Сергеевич',
      event: 'Удалил запись',
      date: '05.06.2022',
    },
    {
      name: 'Попов Сергей Сергеевич',
      event: 'Удалил запись',
      date: '05.06.2022',
    },
    {
      name: 'Попов Сергей Сергеевич',
      event: 'Удалил запись',
      date: '05.06.2022',
    },
  ],
}
</script>
