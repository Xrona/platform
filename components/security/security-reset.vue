<template>
  <div class="security-form__reset">
    <span class="security-form__span">
      После внесения этого изменения вывод средств, продажа через P2P и
      платежные сервисы будут отключены на 48 ч. в целях защиты вашего аккаунта.
    </span>
    <div class="security-form__reset__questions">
      <h3>Пожалуйста, выберите вопрос(-ы):</h3>
      <checkbox-button
        title="У меня нет доступа к аутентификации по SMS, и я хочу ее отключить."
      />
      <checkbox-button
        title="У меня нет доступа к электронной почте, и я хочу ее изменить."
      />
    </div>
    <div class="security-form__buttons">
      <nuxt-link class="box-button main-button" to="/lk/security/reset/form">
        Подтвердить
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import CheckboxButton from '@/components/common/checkbox-button'
export default {
  name: 'SecurityReset',

  components: { CheckboxButton },
}
</script>
