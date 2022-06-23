<template>
  <v-row class="verification__content__worksheet">
    <v-col cols="12" class="py-0">
      <h3>Пожалуйста, ответьте на следующие вопросы</h3>
      <template v-if="questionnaireErrors">
        <div class="verification__content__worksheet__errors">
          <svg-icon name="error" />
          <span>{{ questionnaireErrors }}</span>
        </div>
      </template>
    </v-col>
    <template v-for="(question, idx) in questionnaire">
      <v-col
        :key="question.value"
        cols="12"
        sm="6"
        lg="4"
        :class="idx === questionnaire.length - 1 ? 'pt-0' : 'py-0'"
      >
        <h4>{{ question.value }}</h4>
        <template v-for="answer in question.answers">
          <checkbox-button
            :key="answer.value"
            :value="answer.select"
            :title="answer.value"
            @change="computedAnswer(question.id, answer.id)"
          />
        </template>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CheckboxButton from '~/components/common/checkbox-button'

export default {
  name: 'VerificationWorksheet',

  components: {
    CheckboxButton,
  },

  computed: {
    ...mapGetters('verification', ['questionnaire', 'questionnaireErrors']),
  },

  methods: {
    ...mapMutations('verification', ['setQuestionnaire']),

    computedAnswer(questionId, answerId) {
      this.setQuestionnaire({
        questionId,
        answerId,
      })
    },
  },
}
</script>
