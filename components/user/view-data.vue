<template>
  <div class="view-data">
    <div class="view-data__section personal-data">
      <div class="personal-data__head">
        <h3>Персональные данные</h3>
        <box-button text="Редактировать" icon="edit-alt" />
      </div>
      <div class="view-data__section__content">
        <v-row>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Телефон" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Email" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Фамилия" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Имя" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Отчество" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Гражданство" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Семейное положение" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="view-data__section documents">
      <h3>Документы</h3>
      <div class="view-data__section__content">
        <v-row>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Серия" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Номер" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="СНИЛС" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="ИНН" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="view-data__section company">
      <h3>Данные о компании</h3>
      <div class="view-data__section__content">
        <v-row>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Полное наименование компании" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="ИНН компании" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Юридический адрес" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Фактический адрес" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Сайт компании" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="ОГРН/ОГРНИП" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="КПП" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="ОКПО" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Расчётный счет" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Банк" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="БИК" />
          </v-col>
          <v-col cols="12" sm="6" md="3" class="py-0">
            <read-field label="Кор. счёт" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="view-data__section cash">
      <h3>
        Информация об источниках происхождения денежных средств/имущества*
      </h3>
      <div class="view-data__section__content">
        <v-row>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Доход по основному месту работы" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Накопления прошлых лет" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Доход от работы по совместительству" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Доходы от реализации имущества" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button
              title="Дивиденды от участия в коммерческих проектах"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Заемные средства, кредиты" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button
              title="Доход от совершения сделок с ценными бумагами"
            />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Пенсия" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Предпринимательская деятельность" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Другое" />
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <checkbox-button title="Доход от вкладов, открытых на мое имя" />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="view-data__section questionnaire">
      <h3>Анкета</h3>
      <div class="view-data__section__content">
        <v-row>
          <v-col cols="12" class="py-0">
            <h4>Пожалуйста, ответьте на следующие вопросы</h4>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <div class="questionnaire-question">
              <h5>Какая Ваша инвестиционная цель?</h5>
              <checkbox-button title="Регулярный пассивный доход" />
              <checkbox-button
                title="Сохранение денег (Защита от инфляции др.)"
              />
              <checkbox-button title="Увеличение капитала" />
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <div class="questionnaire-question">
              <h5>Какой уровень риска для Вас предпочтителен?</h5>
              <checkbox-button title="Низкий. Доход до 10% годовых" />
              <checkbox-button title="Средний. Доход 10-15% годовых" />
              <checkbox-button title="Высокий. Доход 15-20% годовых" />
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <div class="questionnaire-question">
              <h5>Какие виды активов Вы используете?</h5>
              <checkbox-button title="Банковский депозит" />
              <checkbox-button title="Акции" />
              <checkbox-button title="Облигации" />
              <checkbox-button title="Иное" />
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <div class="questionnaire-question">
              <h5>Насколько Вы опытный инвестор?</h5>
              <checkbox-button title="Начинающий" />
              <checkbox-button title="Любитель" />
              <checkbox-button title="Профессионал" />
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="py-0">
            <div class="questionnaire-question">
              <h5>Какой размер Вашего инвестиционного портфеля?</h5>
              <checkbox-button title="До 100 000 рублей" />
              <checkbox-button title="От 100 000 до 1 млн рублей" />
              <checkbox-button title="1-10 млн рублей" />
              <checkbox-button title="Предпочитаю не указывать" />
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import ReadField from '@/components/common/read-field'
import BoxButton from '@/components/common/box-button'
import CheckboxButton from '@/components/common/checkbox-button'
export default {
  name: 'ViewData',
  components: { CheckboxButton, BoxButton, ReadField },
}
</script>
