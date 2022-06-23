<template>
  <v-dialog v-model="value">
    <div class="modal sms-modal">
      <h1>Подтвердите номер</h1>
      <p>
        Мы отправили код на указанный номер телефона <span>{{ phone }}</span>
      </p>
      <div class="sms-modal__code">
        <input
          ref="firstSymbol"
          v-model.trim="firstSymbol"
          v-mask="'#'"
          type="text"
        />
        <input
          ref="secondSymbol"
          v-model.trim="secondSymbol"
          v-mask="'#'"
          type="text"
        />
        <input
          ref="thirdSymbol"
          v-model.trim="thirdSymbol"
          v-mask="'#'"
          type="text"
        />
        <input
          ref="fourthSymbol"
          v-model.trim="fourthSymbol"
          v-mask="'#'"
          type="text"
        />
      </div>
      <div class="sms-modal__repeat-code">
        <span>Не получили код?</span>
        <button>Отправить повторно</button>
      </div>
      <box-button class="main-button" text="Подтвердить" @click="confirmCode" />
    </div>
  </v-dialog>
</template>

<script>
import BoxButton from '@/components/common/box-button'

export default {
  name: 'SmsModal',

  components: { BoxButton },

  model: {
    prop: 'dialog',
    event: 'dialog',
  },

  props: {
    phone: {
      type: String,
      default: '',
    },

    dialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      code: {
        firstSymbol: '',
        secondSymbol: '',
        thirdSymbol: '',
        fourthSymbol: '',
      },
    }
  },

  computed: {
    value: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('dialog', value)
      },
    },

    firstSymbol: {
      get() {
        return this.code.firstSymbol
      },
      set(value) {
        this.code = {
          ...this.code,
          firstSymbol: value,
        }

        if (value !== '') {
          this.focus(0)
        }
      },
    },
    secondSymbol: {
      get() {
        return this.code.secondSymbol
      },
      set(value) {
        this.code = {
          ...this.code,
          secondSymbol: value,
        }

        if (value === '') {
          this.$refs.firstSymbol.focus()
        } else {
          this.focus(1)
        }
      },
    },
    thirdSymbol: {
      get() {
        return this.code.thirdSymbol
      },
      set(value) {
        this.code = {
          ...this.code,
          thirdSymbol: value,
        }

        if (value === '') {
          this.$refs.secondSymbol.focus()
        } else {
          this.focus(2)
        }
      },
    },
    fourthSymbol: {
      get() {
        return this.code.fourthSymbol
      },
      set(value) {
        this.code = {
          ...this.code,
          fourthSymbol: value,
        }

        if (value === '') {
          this.$refs.thirdSymbol.focus()
        } else {
          this.focus(3)
        }
      },
    },
  },

  watch: {
    dialog(value) {
      if (value) {
        this.code = {
          firstSymbol: '',
          secondSymbol: '',
          thirdSymbol: '',
          fourthSymbol: '',
        }
      }
    },
  },

  methods: {
    focus(index) {
      const keys = Object.keys(this.code)
      let isFocus = false

      keys.some((key) => {
        if (this.code[key] === '') {
          isFocus = true

          this.$refs[key].focus()
        }

        return this.code[key] === ''
      })

      if (!isFocus && index < 3) {
        this.$refs[keys[index + 1]].focus()
      } else if (!isFocus) {
        this.$refs.fourthSymbol.blur()
      }
    },

    confirmCode() {
      const confirmationToken = Object.values(this.code).join('')

      this.$emit('confirmCode', confirmationToken)
    },
  },
}
</script>
