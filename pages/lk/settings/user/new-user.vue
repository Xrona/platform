<template>
  <div class="new-user">
    <v-row>
      <v-col cols="12" class="pb-5 pt-0">
        <div class="new-user__head">
          <back-button @click="backHandler" />
          <h1>Регистраиция</h1>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-1">
        <h3>Регистрация нового пользователя</h3>
      </v-col>
      <v-col cols="12" md="8" class="pb-0">
        <div class="new-user__form-field">
          <input-dropdown
            label="Выберите тип пользователя"
            :value="role"
            :error="userErrors.role"
          >
            <template #menu="{ close, className }">
              <template v-for="item in roles">
                <button
                  :key="item.value"
                  :class="className"
                  @click="selectRole(item.id, close)"
                >
                  {{ item.value }}
                </button>
              </template>
            </template>
          </input-dropdown>
          <text-input
            v-model="name"
            input-id="newUserName"
            label="Имя"
            :error="userErrors.name"
          />
        </div>
      </v-col>
      <v-col cols="12" md="8" class="py-0">
        <div class="new-user__form-field">
          <text-input
            v-model="phone"
            v-mask="'+7 (###) ### ##-##'"
            input-id="newUserPhone"
            label="Телефон"
            :error="userErrors.phone"
          />
          <text-input
            v-model="email"
            input-id="newUserEmail"
            label="Email"
            :error="userErrors.email"
          />
        </div>
      </v-col>
    </v-row>
    <access-sections :permissions="permissions" @change="setPermission" />
    <v-row>
      <v-col cols="12" sm="6" md="2" class="pt-5">
        <box-button
          text="Сохранить"
          class="main-button save-user"
          @click="saveData"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BackButton from '@/components/common/back-button'
import TextInput from '@/components/common/text-input'
import InputDropdown from '@/components/common/input-dropdown'
import AccessSections from '@/components/settings/access-sections'
import BoxButton from '@/components/common/box-button'
import SettingsEnum from '@/enums/settings'
import FetchMixin from '@/mixins/fetchMixin'

export default {
  name: 'NewUserPage',

  components: {
    BoxButton,
    AccessSections,
    InputDropdown,
    TextInput,
    BackButton,
  },

  mixins: [FetchMixin],

  data() {
    return {
      roles: [],
    }
  },

  async fetch() {
    await this.fetchHandler(async () => {
      this.rolesHandler(await this.getUserFormData())
    })
  },

  computed: {
    ...mapGetters('user', ['permissions', 'user', 'userErrors']),

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

    email: {
      get() {
        return this.user.email
      },
      set(value) {
        this.setProp({
          prop: 'email',
          value,
        })
      },
    },

    role() {
      return this.roles.find((role) => role.id === this.user.role)?.value ?? ''
    },
  },

  destroyed() {
    this.clearState()
  },

  methods: {
    ...mapActions('user', [
      'getPermissions',
      'getUserFormData',
      'registerUser',
    ]),
    ...mapMutations('user', ['setPermission', 'setProp', 'clearState']),

    async saveData() {
      const result = await this.registerUser()

      if (result) {
        this.backHandler()
      }
    },

    rolesHandler(roles) {
      const roleKeys = Object.keys(roles)
      const roleValues = Object.values(roles)

      for (const idx in roleKeys) {
        this.roles.push({
          id: roleKeys[idx],
          value: roleValues[idx],
        })
      }
    },

    selectRole(value, fn = null) {
      this.setProp({
        prop: 'role',
        value,
      })

      if (fn) {
        fn()
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
}
</script>
