<template>
  <div class="file-input">
    <span class="file-input__label">
      {{ label }}
      <template v-if="isRequired">
        <span class="file-input__label__required">*</span>
      </template>
    </span>
    <template v-if="fileList">
      <div class="file-input__list">
        <template v-for="(file, idx) in fileList">
          <div :key="`${idx}.${file}`" class="file-input__list__item">
            <span>{{ file.name }}</span>
            <button @click="removeFile(file.id)">
              <svg-icon name="close-outlined" width="6.5" height="6.55" />
            </button>
          </div>
        </template>
      </div>
    </template>
    <box-button
      class="white-with-icon"
      :class="{ 'error-border': error }"
      icon="image"
      text="Загрузить"
      :disabled="disabled"
      @click="uploadFile"
    />
    <input
      ref="inputFile"
      type="file"
      class="d-none"
      :multiple="multiple"
      @change="upload"
    />
    <template v-if="error">
      <div class="error-validation">
        <svg-icon name="error" />
        <span>{{ error }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import BoxButton from '@/components/common/box-button'
export default {
  name: 'FileInput',
  components: { BoxButton },
  model: {
    event: 'load',
    prop: 'fileData',
  },

  props: {
    label: {
      type: String,
      default: '',
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    fileData: {
      type: [Array, Object],
      default: Array,
    },

    isRequired: {
      type: Boolean,
    },

    error: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
    },
  },

  computed: {
    fileList() {
      let fileList = this.fileData

      if (fileList !== null && !Array.isArray(fileList)) {
        fileList = [fileList]
      }

      if (Array.isArray(fileList) && fileList.length < 1) {
        return null
      }

      return fileList ?? null
    },
  },

  methods: {
    uploadFile() {
      this.$refs.inputFile.click()
    },

    imageSrc(file) {
      return file.base64 ?? `http://${file.url}`
    },

    removeFile(id) {
      let fileData = []

      if (this.multiple) {
        this.fileData.forEach((elem) => {
          if (elem.id !== id) {
            fileData.push(elem)
          }
        })
      } else {
        fileData = null
      }

      this.$emit('load', fileData)
    },

    async upload(event) {
      const files = Array.from(event.target.files)

      if (files.length > 0) {
        const resultFiles = await Promise.all(
          files?.map(async (file, idx) => {
            return {
              id: idx,
              name: file?.name ?? `file${idx}`,
              size: `${((file.size / 1024) * 1024).toFixed(2)}`,
              base64: await this.$blobToDataUrl(file),
              file,
              url: '',
            }
          })
        )

        if (this.multiple) {
          await this.$emit('load', resultFiles)
        } else {
          await this.$emit('load', resultFiles[0])
        }
      }
    },
  },
}
</script>
