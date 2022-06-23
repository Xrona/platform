<template>
  <div class="bid-create__tabs">
    <box-dropdown>
      <template #target>
        <svg-icon :name="currentIcon" width="24" height="24" />
        <span>{{ currentName }}</span>
      </template>
      <template #menu="slotProps">
        <template v-for="(tab, idx) in $options.tabs">
          <button
            :key="tab.name"
            :class="
              idx === currentStep
                ? `active ${slotProps.className}`
                : slotProps.className
            "
            @click="selectStep(idx, slotProps.closeMenu)"
          >
            <svg-icon :name="tab.icon" width="24" height="24" />
            <span>{{ tab.name }}</span>
          </button>
        </template>
      </template>
    </box-dropdown>

    <div class="bid-create__tabs__menu">
      <template v-for="(tab, idx) in $options.tabs">
        <box-button
          :key="tab.name"
          class="application-tab"
          :class="{ active: idx === currentStep }"
          :text="tab.name"
          :icon="tab.icon"
          @click="selectStep(idx)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import BoxDropdown from '~/components/common/box-dropdown'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'BidCreateTabs',

  components: { BoxButton, BoxDropdown },

  props: {
    currentStep: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    currentName() {
      return this.$options.tabs?.[this.currentStep]?.name ?? 'null'
    },

    currentIcon() {
      return this.$options.tabs?.[this.currentStep]?.icon ?? 'null'
    },
  },

  methods: {
    selectStep(idx, fn = null) {
      this.$emit('selectStep', idx)

      if (fn) {
        fn()
      }
    },
  },

  tabs: [
    {
      name: 'Данные об объекте',
      icon: 'home',
    },
    {
      name: 'Проверка данных',
      icon: 'zoom',
    },
    {
      name: 'Подтверждение',
      icon: 'guard',
    },
  ],
}
</script>
