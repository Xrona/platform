<template>
  <div class="security-form__actions">
    <div class="actions-notifications">
      <div class="actions-notifications__success">
        <svg-icon name="sms" />
        <span>Отключить SMS аутентификацию</span>
      </div>
      <div class="actions-notifications__success">
        <svg-icon name="envelop" />
        <span>Изменить Email адрес</span>
      </div>
      <div class="actions-notifications__error">
        <svg-icon name="attention-alt" />
        <span>
          Проверка сброса параметров безопасности может занять несколько дней.
          Дождитесь завершения. После внесения этого изменения вывод средств,
          продажа через P2P и платежные сервисы будут отключены на 48 ч. в целях
          защиты вашего аккаунта.
        </span>
      </div>
    </div>
    <div class="actions-fields">
      <text-input
        label="Новый номер телефона"
        input-id="SecurityActionsInputPhone"
      />
      <div>
        <text-input
          label="Код верификации нового номера телефона"
          input-id="SecurityActionsInputPhoneCode"
        />
        <span class="security-form__explanation"
          >Введите 6-значный код из SMS</span
        >
      </div>
      <text-input
        label="Введите Email, чтобы подтвердить аккаунт."
        input-id="SecurityActionsInputEmail"
      />
      <div>
        <text-input
          label="Код верификации (на эл. почту)"
          input-id="SecurityActionsInputPhoneCode"
        />
        <span class="security-form__explanation"
          >Введите 6-значный код из письма</span
        >
      </div>
    </div>
    <div class="security-form__buttons">
      <box-button text="Сбросить" class="main-button" />
      <nuxt-link class="box-button gray-button" to="/lk/security/reset"
        >Назад</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/text-input'
import BoxButton from '@/components/common/box-button'
export default {
  name: 'SecurityActions',

  components: { BoxButton, TextInput },
}
</script>
