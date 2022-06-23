import DefaultStore from '@/helpers/default-store'

function prepareUserProfile(userProfile) {
  return {
    ...userProfile,
    snils: userProfile.snils.replace(/\D/g, ''),
  }
}

export default {
  state: () => ({
    payload: { ...DefaultStore.payload },
    errors: { ...DefaultStore.errors },
    nationalities: [],
    familyStatuses: [],
  }),

  getters: {
    personalErrors(state) {
      return state.errors.userProfile
    },

    imageErrors(state) {
      return state.errors.images
    },

    companyErrors(state) {
      return state.errors.companyProfile
    },

    questionnaireErrors(state) {
      return state.errors.questions.questionnaire
    },

    confirmationTokenError(state) {
      return state.errors.confirmationToken
    },

    confirmationErrors(state) {
      return {
        investPlatformAgreement: state.errors.investPlatformAgreement,
        operatorAndInvestorAgreement: state.errors.operatorAndInvestorAgreement,
        confirmResidentRf: state.errors.confirmResidentRf,
        personalAgreement: state.errors.personalAgreement,
        confirmationToken: state.errors.confirmationToken,
      }
    },

    isCompany(state) {
      return state.payload.isCompany
    },

    personImages(state) {
      return state.payload.images
    },

    questionnaire(state) {
      return state.payload.questions.questionnaire
    },

    userProfile(state) {
      return state.payload.userProfile
    },

    companyProfile(state) {
      return state.payload.companyProfile
    },

    confirmation(state) {
      return {
        investPlatformAgreement: state.payload.investPlatformAgreement,
        operatorAndInvestorAgreement:
          state.payload.operatorAndInvestorAgreement,
        confirmResidentRf: state.payload.confirmResidentRf,
        personalAgreement: state.payload.personalAgreement,
      }
    },

    confirmationToken(state) {
      return state.payload.confirmationToken ?? ''
    },

    familyStatuses(state) {
      return state.familyStatuses ?? []
    },

    nationalities(state) {
      return state.nationalities ?? []
    },
  },

  mutations: {
    clearErrorMessage(state, names) {
      const namesArray = names.split('.')

      state.errors[namesArray[0]][namesArray[1]] = null
    },

    clearErrors(state) {
      state.errors = { ...DefaultStore.errors }
    },

    clearState(state) {
      state.payload = {
        verifyAs: '',
        userProfile: {
          name: '',
          surname: '',
          patronymic: '',
          passport: '',
          nationality: '',
          inn: '',
          familyStatus: '',
          snils: '',
        },
        images: {
          userPassport: null,
          userPassportActiveSubscription: null,
        },
        companyProfile: {
          name: '',
          inn: '',
          registrationAddress: '',
          bik: '',
          site: '',
          realAddress: '',
          realAddressEqual: false,
          kpp: '',
          ogrn: '',
          okpo: '',
          bank: '',
          checkingAccount: '',
          correspondingAccount: '',
        },
        investPlatformAgreement: false,
        operatorAndInvestorAgreement: false,
        confirmResidentRf: false,
        personalAgreement: false,
        isCompany: 0,
        confirmationToken: '',
        questions: {
          finance: [],
          questionnaire: [],
        },
      }
    },

    setPersonErrors(state, payload) {
      state.errors = {
        ...state.errors,
        userProfile: {
          name: payload?.['user_profile.name']?.lastItem ?? null,
          surname: payload?.['user_profile.surname']?.lastItem ?? null,
          patronymic: payload?.['user_profile.patronymic']?.lastItem ?? null,
          passport:
            (payload?.['user_profile.passport_series']?.lastItem ||
              payload?.['user_profile.passport_number']?.lastItem) ??
            null,
          nationality: payload?.['user_profile.nationality']?.lastItem ?? null,
          inn: payload?.['user_profile.inn']?.lastItem ?? null,
          familyStatus:
            payload?.['user_profile.family_status']?.lastItem ?? null,
          snils: payload?.['user_profile.snils']?.lastItem ?? null,
          isCompany: payload?.['user_profile.is_company']?.lastItem ?? null,
        },
        images: {
          userPassport: payload?.['images.user_passport']?.lastItem ?? null,
          userPassportActiveSubscription:
            payload?.['images.user_passport_active_subscription']?.lastItem ??
            null,
        },
      }
    },

    setCompanyErrors(state, payload) {
      state.errors = {
        ...state.errors,
        companyProfile: {
          name: payload?.['company_profile.name']?.lastItem ?? null,
          inn: payload?.['company_profile.inn']?.lastItem ?? null,
          registrationAddress:
            payload?.['company_profile.registration_address']?.lastItem ?? null,
          bik: payload?.['company_profile.bik']?.lastItem ?? null,
          site: payload?.['company_profile.site']?.lastItem ?? null,
          realAddress:
            payload?.['company_profile.real_address']?.lastItem ?? null,
          realAddressEqual:
            payload?.['company_profile.real_address_equal']?.lastItem ?? null,
          kpp: payload?.['company_profile.kpp']?.lastItem ?? null,
          ogrn: payload?.['company_profile.ogrn']?.lastItem ?? null,
          okpo: payload?.['company_profile.okpo']?.lastItem ?? null,
          bank: payload?.['company_profile.bank']?.lastItem ?? null,
          checkingAccount:
            payload?.['company_profile.checking_account']?.lastItem ?? null,
          correspondingAccount:
            payload?.['company_profile.corresponding_account']?.lastItem ??
            null,
        },
      }
    },

    setQuestionnaireErrors(state, payload) {
      state.errors = {
        ...state.errors,
        questions: {
          questionnaire: 'На некоторые вопросы нет ответа',
        },
      }
    },

    setConfirmationTokenError(state, payload) {
      state.errors.confirmationToken = payload
    },

    setConfirmationError(state, payload) {
      state.errors = {
        ...state.errors,
        investPlatformAgreement:
          payload?.invest_platform_agreement?.lastItem ?? null,
        operatorAndInvestorAgreement:
          payload?.operator_and_investor_agreement?.lastItem ?? null,
        confirmResidentRf: payload?.confirm_resident_rf?.lastItem ?? null,
        personalAgreement: payload?.personal_agreement?.lastItem ?? null,
        confirmationToken: payload?.confirmation_token?.lastItem ?? null,
      }
    },

    setVerify(state, payload) {
      state.payload.verifyAs = payload
    },

    setIsCompany(state, payload) {
      state.payload.isCompany = payload ? 1 : 0
    },

    setUserProfile(state, payload) {
      state.payload.userProfile[payload.prop] = payload.value
    },

    setUserPassport(state, payload) {
      state.payload.images.userPassport = payload
    },

    setUserPassportActiveSubscription(state, payload) {
      state.payload.images.userPassportActiveSubscription = payload
    },

    setCompanyProfile(state, payload) {
      state.payload.companyProfile[payload.prop] = payload.value
    },

    setFinance(state, payload) {
      state.payload.questions.finance = payload
    },

    setConfirmation(state, payload) {
      state.payload[payload.prop] = payload.value
    },

    presetQuestionnaire(state, payload) {
      state.payload.questions.questionnaire = payload
    },

    presetUserProfile(state, payload) {
      if (payload) {
        const keys = Object.keys(payload)

        keys.forEach((key) => {
          const keyName = this.$case.toCamelCase(key)

          state.payload.userProfile[keyName] =
            payload[key] === null ? '' : payload[key]
        })
      }
    },

    presetNationalities(state, payload) {
      state.nationalities = payload
    },

    presetFamilyStatuses(state, payload) {
      state.familyStatuses = payload
    },

    setQuestionnaire(state, payload) {
      state.payload.questions.questionnaire =
        state.payload.questions.questionnaire.map((question) => {
          if (question.id === payload.questionId) {
            const answers = question.answers.map((answer) => {
              if (answer.id === payload.answerId) {
                return {
                  ...answer,
                  select: !answer.select,
                }
              }
              if (question.type !== 'multiple') {
                return {
                  ...answer,
                  select: false,
                }
              }

              return answer
            })

            return {
              ...question,
              answers,
            }
          }

          return question
        })
    },
  },

  actions: {
    async loadFormData({ commit, state }, verificationRole) {
      commit('setVerify', verificationRole)

      function prepareQuestions(questions) {
        return questions.map((question) => {
          const answers = question.answers?.map((answer) => {
            return {
              id: answer?.id,
              value: answer?.value,
              roleType: answer?.role_type,
              select: false,
            }
          })

          return {
            id: question?.id,
            value: question?.value,
            type: question?.answer_type,
            answers,
          }
        })
      }

      await this.$api.verification
        .formData(verificationRole)
        .then(async (response) => {
          const data = response.data.data
          const profile = data.user.user_profile
          const questionnaire = data.questions?.questionnaire ?? []
          const finance = data.questions?.finance ?? []
          const nationalities = data.lists?.nationality ?? []
          const familyStatuses = data.lists?.family_status ?? []

          const commitQuestionnaire = prepareQuestions(questionnaire)
          const commitFinance = prepareQuestions(finance)

          await commit('presetQuestionnaire', commitQuestionnaire)
          await commit('setFinance', commitFinance)
          await commit('presetUserProfile', profile)
          await commit('presetNationalities', nationalities)
          await commit('presetFamilyStatuses', familyStatuses)
        })
    },

    async validatePersonData({ commit, state }) {
      commit('clearErrors')
      let result = true

      const payload = {
        userProfile: prepareUserProfile(state.payload.userProfile),
        images: { ...state.payload.images },
      }

      const passport = state.payload.userProfile.passport.split('-')

      payload.userProfile.passportSeries = passport[0]

      if (passport.length > 1) {
        payload.userProfile.passportNumber = passport[1]
      }

      await this.$load(
        () => {
          return this.$api.verification.validatePerson(
            state.payload.verifyAs,
            state.payload.isCompany,
            payload
          )
        },
        (error) => {
          result = false

          const errors = error.response.data.errors

          commit('setPersonErrors', errors)
        }
      )

      return result
    },

    async validateCompanyData({ commit, state }) {
      commit('clearErrors')
      let result = true

      const payload = {
        companyProfile: { ...state.payload.companyProfile },
      }

      await this.$load(
        () => {
          return this.$api.verification.validateCompany(
            state.payload.verifyAs,
            1,
            payload
          )
        },
        (error) => {
          result = false
          const errors = error.response.data.errors

          commit('setCompanyErrors', errors)
        }
      )

      return result
    },

    async sendSms({ commit, state }) {
      let result = true

      await this.$load(
        () => this.$api.verification.sendSms(state.payload.verifyAs),
        () => {
          result = false
        }
      )

      return result
    },

    async submit({ commit, state }) {
      commit('clearErrors')
      let result = true

      const payload = {
        ...state.payload,
        userProfile: prepareUserProfile(state.payload.userProfile),
      }

      await this.$load(
        () => this.$api.verification.submit(payload),
        (error) => {
          result = 5

          if (error.response.status === 403) {
            commit('setConfirmationTokenError', error.response.data.message)
          } else {
            const errors = error.response.data.errors
            const errorKeys = Object.keys(errors)

            commit('setConfirmationError', errors)
            commit('setPersonErrors', errors)
            commit('setCompanyErrors', errors)

            errorKeys.some((key) => {
              if (key.includes('user_profile.') || key.includes('images')) {
                result = 0

                return true
              }
              if (key.includes('company_profile.')) {
                result = 1

                return true
              }
              if (key.includes('questions.finance')) {
                result = 2
                return true
              }

              if (key.includes('questions.questionnaire')) {
                result = 3
                return true
              }

              return false
            })
          }
        }
      )

      return result
    },
  },
}
