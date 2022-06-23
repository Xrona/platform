<template>
  <div class="settings__platform">
    <v-row>
      <v-col cols="12" sm="6" md="3" class="py-0 settings__platform__min-sum">
        <text-input
          v-model="minSumInvest"
          input-id="minSumInvest"
          label="Минимальная сумма инвестирования"
          placeholder="Введите минимальное значение"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3" class="py-0 settings__platform__max-sum">
        <text-input
          v-model="maxSumInvest"
          input-id="maxSumInvest"
          label="Максимальная сумма инвестирования"
          placeholder="Введите максимальное значение"
        />
      </v-col>
      <v-col cols="6" class="d-none d-md-block py-0"></v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="py-0 settings__platform__min-percent"
      >
        <text-input
          v-model="minPercent"
          input-id="minPercent"
          label="Минимальный процент"
          placeholder="Введите минимальное значение"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="py-0 settings__platform__max-percent"
      >
        <text-input
          v-model="maxPercent"
          input-id="maxPercent"
          label="Максимальный процент"
          placeholder="Введите максимальное значение"
        />
      </v-col>
      <v-col cols="6" class="d-none d-md-block py-0"></v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="py-0 settings__platform__min-fundraising"
      >
        <text-input
          v-model="minFundraising"
          input-id="minFundraising"
          label="Минимальный срок сбора средств"
          placeholder="Введите минимальное значение"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        class="py-0 settings__platform__max-fundraising"
      >
        <text-input
          v-model="maxFundraising"
          input-id="maxFundraising"
          label="Максимальный срок сбора средств"
          placeholder="Введите максимальное значение"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TextInput from '@/components/common/text-input'
export default {
  name: 'SettingsPlatform',

  components: { TextInput },

  data() {
    return {
      minSumInvest: '',
      minPercent: '',
      minFundraising: '',
      maxSumInvest: '',
      maxPercent: '',
      maxFundraising: '',
    }
  },
}
</script>
