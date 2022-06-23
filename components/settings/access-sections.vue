<template>
  <v-row class="access-sections">
    <v-col cols="12" class="pb-4 pt-4">
      <h3>Доступ к разделам</h3>
    </v-col>
    <v-col cols="12" md="6" class="pt-0">
      <div class="access-sections__options">
        <template v-for="permission in permissions">
          <checkbox-button
            :key="permission.label"
            :title="permission.label"
            :value="permission.value"
            @change="(value) => changePermission(permission.id, value)"
          />
        </template>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import CheckboxButton from '@/components/common/checkbox-button'

export default {
  name: 'AccessSections',

  components: { CheckboxButton },

  props: {
    permissions: {
      type: Array,
      default: Array,
    },
  },

  methods: {
    changePermission(id, value) {
      this.$emit('change', { id, value })
    },
  },
}
</script>
