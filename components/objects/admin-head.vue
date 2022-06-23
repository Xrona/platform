<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <div class="admin-head">
        <div class="admin-head__back">
          <box-button
            text="Назад"
            icon="arrow"
            icon-class="svg-right"
            class="white-button"
          />
        </div>
        <h1>Объект № {{ name }}</h1>
        <box-button
          text="Редактировать"
          icon="edit-alt"
          class="admin-head__edit with-icon"
          @click="editHandler"
        />
        <box-button
          text="Опубликовать"
          icon="file-upload"
          class="admin-head__publish with-icon"
        />
        <box-button
          text="Удалить"
          icon="trash-alt"
          class="admin-head__delete with-icon"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import BoxButton from '@/components/common/box-button'
export default {
  name: 'AdminHead',

  components: { BoxButton },

  props: {
    name: {
      type: String,
      default: '',
    },
  },

  methods: {
    editHandler() {
      this.$emit('edit')
    },
  },
}
</script>
