<template>
  <v-row>
    <v-col cols="12" sm="6" lg="12" class="verification__tabs">
      <box-dropdown>
        <template #target>
          <template v-for="(tab, index) in tabList">
            <template v-if="step === index">
              <span :key="tab.name" class="d-flex">
                <svg-icon :name="tab.icon" width="24" height="24" />
                {{ tabName(tab) }}
              </span>
            </template>
          </template>
        </template>
        <template #menu="slotProps">
          <template v-for="(tab, index) in tabList">
            <template v-if="step !== index">
              <button
                :key="`tabList-${tab.name}`"
                :class="slotProps.className"
                @click="selectTab(index, slotProps.closeMenu)"
              >
                <svg-icon :name="tab.icon" width="24" height="24" />
                {{ tabName(tab) }}
              </button>
            </template>
          </template>
        </template>
      </box-dropdown>
      <div class="verification__tabs__list">
        <template v-for="(tab, index) in tabList">
          <box-button
            :key="`lgListTab${tab.name}`"
            class="verification-tab"
            :class="{ active: step === index }"
            :text="tab.name"
            :icon="tab.icon"
            @click="selectTab(index)"
          />
        </template>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import BoxDropdown from '~/components/common/box-dropdown'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'VerificationTabs',

  components: { BoxButton, BoxDropdown },

  model: {
    event: 'change',
    prop: 'step',
  },

  props: {
    step: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      tabList: [
        {
          name: 'Перс. данные',
          fullName: 'Персональные данные',
          icon: 'profile',
        },
        {
          name: 'О компании',
          icon: 'bag',
        },
        {
          name: 'Фин. положение',
          fullName: 'Финансовое положение',
          icon: 'circle-diagram',
        },
        {
          name: 'Анкета',
          icon: 'file',
        },
        {
          name: 'Проверка',
          icon: 'zoom',
        },
        {
          name: 'Подтверждение',
          icon: 'guard',
        },
      ],
    }
  },

  methods: {
    selectTab(index, fn = null) {
      this.$emit('change', index)

      if (fn !== null) {
        fn()
      }
    },

    tabName(tab) {
      return tab?.fullName ?? tab.name
    },
  },
}
</script>
