<template>
  <v-row class="settings__user">
    <v-col cols="12" sm="6" md="4" class="py-0 user-images">
      <h3>Фотография профиля</h3>
      <file-input
        v-model="avatar"
        label="Загрузить фотографию профиля"
        :disabled="disabled"
      />
    </v-col>
    <v-col cols="12" class="py-0 user-notification">
      <h3>Уведомления</h3>
      <checkbox-button
        v-model="notifications"
        :disabled="disabled"
        title="Получать уведомления на почту"
      />
    </v-col>
    <v-dialog v-model="modal">
      <div class="modal">
        <h1>Фотография успешно загружена</h1>
        <span>Выбранная область будет показываться на вашей странице</span>
        <cropper
          ref="cropper"
          class="cropper"
          :src="avatarCropper"
          :stencil-props="{
            aspectRatio: 10 / 10,
          }"
        />
        <div class="d-flex justify-space-between w-full">
          <box-button
            class="main-button"
            text="Сохранить"
            @click="saveAvatar"
          />
          <box-button
            class="white-button"
            text="Отмена"
            @click="cancelPhotoProfile"
          />
        </div>
      </div>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import FileInput from '@/components/common/file-input'
import CheckboxButton from '@/components/common/checkbox-button'
import 'vue-advanced-cropper/dist/style.css'
import BoxButton from '@/components/common/box-button'

export default {
  name: 'SettingsUser',

  components: { BoxButton, CheckboxButton, FileInput },

  props: {
    disabled: {
      type: Boolean,
    },
  },

  data() {
    return {
      loadImage: null,
      modal: false,
      avatarCropped: null,
    }
  },

  computed: {
    ...mapGetters('settings', ['userSettings']),

    notifications: {
      get() {
        return this.userSettings.notificationEmail
      },
      set(value) {
        this.setAccountSettings({
          name: 'notificationEmail',
          value,
        })
      },
    },

    avatar: {
      get() {
        return this.userSettings.avatar
      },
      set(value) {
        this.loadImage = value
        this.modal = true
      },
    },
    avatarCropper() {
      return this.loadImage?.base64 ?? ''
    },
  },

  methods: {
    ...mapMutations('settings', ['setAccountSettings']),

    cancelPhotoProfile() {
      this.loadImage = null
      this.modal = false
    },

    saveAvatar() {
      const { canvas } = this.$refs?.cropper?.getResult()

      if (canvas) {
        canvas.toBlob((blob) => {
          this.loadImage.file = new File([blob], 'avatar', {
            lastModified: new Date(),
          })

          this.setAccountSettings({
            name: 'avatar',
            value: this.loadImage,
          })
        })

        // mock
        this.avatarCropped = canvas.toDataURL()

        const newWin = window.open('about:blank', 'image')
        newWin.document.body.innerHTML = `<img src="${this.avatarCropped}">`

        this.modal = false
      }
    },
  },
}
</script>

<style scoped>
.cropper {
  height: 350px;
  width: 350px;
  background: var(--gray-10);
}
</style>
