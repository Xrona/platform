<template>
  <div class="security-form__check">
    <span class="security-form__span"
      >Для защиты аккаунта выполните следующую проверку</span
    >
    <div>
      <text-input
        input-id="inputPhoneCode"
        label="Код верификации (на телефон)"
        placeholder="####"
      />
      <span class="security-form__explanation">
        Введите 6-значный код, отправленный на 792****8786
      </span>
    </div>
    <div>
      <text-input
        input-id="inputMailCode"
        label="Код верификации (на эл. почту)"
        placeholder="####"
      />
      <span class="security-form__explanation"
        >Введите 6-значный код, отправленный на des***@studiosiberia.ru</span
      >
    </div>
    <div class="security-form__buttons">
      <box-button text="Отправить" class="main-button" />
      <nuxt-link to="/lk/security/reset" class="button-link">
        Нет доступа к проверке безопасности ?
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/text-input'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'SecurityCheck',

  components: { BoxButton, TextInput },
}
</script>
