<template>
  <div class="settings">
    <template v-if="isAdmin">
      <v-row>
        <v-col cols="12" sm="6" md="8" class="py-0">
          <h1>Настройки платформы</h1>
          <box-dropdown class="settings__dropdown">
            <template #target>
              <span>{{ settingName }}</span>
            </template>
            <template #menu="{ className, closeMenu }">
              <template v-for="setting in settingsList">
                <button
                  :key="setting"
                  :class="className"
                  @click="selectSetting(setting.value, closeMenu)"
                >
                  {{ setting.name }}
                </button>
              </template>
            </template>
          </box-dropdown>
          <div class="settings__tabs">
            <template v-for="setting in settingsList">
              <button
                :key="`${setting.name}-tab`"
                class="settings__tabs__button"
                :class="{ active: currentSetting === setting.value }"
                @click="selectSetting(setting.value)"
              >
                {{ setting.name }}
              </button>
            </template>
          </div>
        </v-col>
      </v-row>
    </template>
    <template v-if="currentSetting === $options.settingsEnum.PLATFORM">
      <settings-platform />
      <v-row>
        <v-col cols="12" md="3" class="py-0">
          <box-button
            class="main-button settings__button-save"
            text="Сохранить"
          />
        </v-col>
      </v-row>
    </template>
    <template v-if="currentSetting === $options.settingsEnum.ACCOUNT">
      <settings-account />
    </template>
    <template v-if="currentSetting === $options.settingsEnum.ACCESS">
      <settings-access :users="users" />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BoxDropdown from '@/components/common/box-dropdown'
import SettingsEnum from '@/enums/settings'
import SettingsPlatform from '@/components/settings/settings-platform'
import BoxButton from '@/components/common/box-button'
import SettingsAccount from '@/components/settings/settings-account'
import SettingsAccess from '@/components/settings/settings-access'
import UserRoleEnum from '@/enums/user-role'
import FetchMixin from '@/mixins/fetchMixin'

export default {
  name: 'SettingsPage',

  components: {
    SettingsAccess,
    SettingsAccount,
    BoxButton,
    SettingsPlatform,
    BoxDropdown,
  },

  mixins: [FetchMixin],

  settingsEnum: SettingsEnum,

  data() {
    return {
      currentSetting: SettingsEnum.ACCOUNT,
    }
  },

  async fetch() {
    await this.fetchHandler(async () => {
      await this.formData()
      if (this.isAdmin) {
        await this.getUsers()
      }
    })
  },

  computed: {
    ...mapGetters('users', ['users']),

    userRole() {
      return this.$auth.user?.role?.id ?? UserRoleEnum.GUEST
    },

    isAdmin() {
      return this.userRole === UserRoleEnum.ADMIN
    },

    settingsList() {
      return SettingsEnum.getValues()
    },
    settingName() {
      return SettingsEnum.getName(this.currentSetting)
    },
  },

  mounted() {
    if (this.isAdmin) {
      this.currentSetting = SettingsEnum.PLATFORM
    }

    const tab = this.$route.params?.tab ?? null

    if (tab) {
      this.currentSetting = tab
    }
  },

  methods: {
    ...mapActions('settings', ['formData']),
    ...mapActions('users', ['getUsers']),

    selectSetting(value, fn = null) {
      this.currentSetting = value

      if (fn) {
        fn()
      }
    },
  },
}
</script>
