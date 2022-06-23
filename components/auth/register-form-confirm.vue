<template>
  <div class="form-confirm">
    <text-input
      v-model="code"
      input-id="registerPhoneCode"
      label="Введите код"
      :is-required="true"
      placeholder="wRuugte7"
    />
    <p>
      Не пришел код?
      <a href="#">Отправить повторно</a>
    </p>
    <box-button text="Подтвердить" @click="confirmPhone" />
  </div>
</template>

<script>
import TextInput from '~/components/common/text-input'
import BoxButton from '~/components/common/box-button'
export default {
  name: 'RegisterFormConfirm',

  components: { BoxButton, TextInput },

  data() {
    return {
      code: '',
    }
  },

  methods: {
    confirmPhone() {
      this.$emit('confirmPhone', this.code)
    },
  },
}
</script>
