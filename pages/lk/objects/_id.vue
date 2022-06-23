<template>
  <div class="one-object">
    <template v-if="isUser">
      <v-row>
        <v-col cols="5" class="py-0 one-object__title">
          <h1>Объекты</h1>
        </v-col>
        <v-col cols="12" md="7" class="py-0 one-object__back">
          <box-button
            text="Назад"
            icon="arrow"
            icon-class="svg-right"
            class="white-button"
            @click="$router.back()"
          />
        </v-col>
        <v-col cols="12" md="5" class="py-0 d-none d-md-block">
          <h2>Другие объекты</h2>
          <data-list>
            <template v-for="options in objects">
              <list-object
                :key="`listObject${options.name}`"
                :options="options"
              />
            </template>
          </data-list>
        </v-col>
        <v-col cols="12" md="7" class="py-0">
          <object-content :options="options" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <admin-content
        :disabled-prop="disabled"
        :options="options"
        @disabledEvent="disabledHandler"
      />
      <v-dialog v-model="modal">
        <div class="modal">
          <h1>Изменения не были сохранены</h1>
          <p>Покинуть страницу?</p>
          <div class="d-flex justify-space-between">
            <box-button text="Покинуть страницу" class="white-button" />
            <box-button text="Отмена" class="main-button" />
          </div>
        </div>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BackButton from '@/components/common/back-button'
import DataList from '@/components/common/data-list'
import ListObject from '@/components/objects/list-object'
import ObjectContent from '@/components/objects/object-content'
import UserRoleEnum from '@/enums/user-role'
import AdminContent from '@/components/objects/admin-content'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'ObjectId',

  components: {
    BoxButton,
    AdminContent,
    ObjectContent,
    ListObject,
    DataList,
    BackButton,
  },

  beforeRouteLeave(to, from, next) {
    if (!this.disabled) {
      this.modal = true
      this.route = to.path
      next(false)
    } else {
      next()
    }
  },

  data() {
    return {
      disabled: true,
      modal: false,
      route: null,
    }
  },

  async fetch() {
    this.$nuxt?.$loading?.start()

    await this.getObject(this.id).then(async () => {
      await this.getObjects().then(() => this.$nuxt?.$loading?.finish())
    })
  },

  computed: {
    ...mapGetters('object', ['options']),
    ...mapGetters('objects', ['objects']),

    id() {
      return this.$route.params.id
    },

    isUser() {
      const id = this.$auth.user?.role?.id ?? UserRoleEnum.GUEST

      return id !== UserRoleEnum.ADMIN && id !== UserRoleEnum.MODERATOR
    },
  },

  methods: {
    ...mapActions('object', ['getObject']),
    ...mapActions('objects', ['getObjects']),

    disabledHandler(value) {
      this.disabled = value
    },
  },
}
</script>
