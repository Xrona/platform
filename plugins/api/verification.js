import VerificationStepEnum from '@/enums/verification-step'

export default (instance) => {
  const validateUrl = '/user/verification/form/step/validate'

  function checkNull(string) {
    if (typeof string === 'string' && string.length === 0) {
      return undefined
    }

    return string
  }

  function prepareFiles(fileObject) {
    return fileObject?.file ?? undefined
  }

  function prepareQuestion(questionList) {
    const obj = {}

    questionList.forEach((question) => {
      obj[question.id] = {}

      question.answers.forEach((answer) => {
        if (answer.select) {
          obj[question.id][answer.id] = answer.select
        } else {
          obj[question.id][answer.id] = undefined
        }
      })
    })

    return obj
  }

  return {
    formData(role) {
      return instance.get('/user/verification/form-data', {
        params: {
          verify_as: role,
        },
      })
    },

    validatePerson(verificationRole, isCompany, payload) {
      const ctx = instance.getContext()

      return instance.post(
        validateUrl,
        ctx.$objectToFormData({
          user_profile: {
            name: checkNull(payload.userProfile.name),
            surname: checkNull(payload.userProfile.surname),
            patronymic: checkNull(payload.userProfile.patronymic),
            passport_series: checkNull(payload.userProfile.passportSeries),
            passport_number: checkNull(payload.userProfile.passportNumber),
            nationality: checkNull(payload.userProfile.nationality),
            inn: checkNull(payload.userProfile.inn),
            family_status: checkNull(payload.userProfile.familyStatus),
            snils: checkNull(payload.userProfile.snils),
            is_company: checkNull(payload.userProfile.isCompany),
          },
          images: {
            user_passport: prepareFiles(payload.images.userPassport),
            user_passport_active_subscription: prepareFiles(
              payload.images.userPassportActiveSubscription
            ),
          },
        }),
        {
          params: {
            form_type: VerificationStepEnum.PERSONAL,
            verify_as: verificationRole,
            is_company: isCompany,
          },
        }
      )
    },

    validateCompany(verificationRole, isCompany, payload) {
      return instance.post(
        validateUrl,
        {
          company_profile: {
            name: checkNull(payload.companyProfile.name),
            inn: checkNull(payload.companyProfile.inn),
            registration_address: checkNull(
              payload.companyProfile.registrationAddress
            ),
            bik: checkNull(payload.companyProfile.bik),
            site: checkNull(payload.companyProfile.site),
            real_address: checkNull(payload.companyProfile.realAddress),
            real_address_equal: checkNull(
              payload.companyProfile.realAddressEqual
            ),
            kpp: checkNull(payload.companyProfile.kpp),
            ogrn: checkNull(payload.companyProfile.ogrn),
            okpo: checkNull(payload.companyProfile.okpo),
            bank: checkNull(payload.companyProfile.bank),
            checking_account: checkNull(payload.companyProfile.checkingAccount),
            corresponding_account: checkNull(
              payload.companyProfile.correspondingAccount
            ),
          },
        },
        {
          params: {
            form_type: VerificationStepEnum.COMPANY,
            verify_as: verificationRole,
            is_company: isCompany,
          },
        }
      )
    },

    validateFinance(verificationRole, isCompany) {
      return instance.post(
        validateUrl,
        {},
        {
          params: {
            form_type: VerificationStepEnum.FINANCE,
            verify_as: verificationRole,
            is_company: isCompany,
          },
        }
      )
    },

    validateQuestionnaire(verificationRole, isCompany) {
      return instance.post(
        validateUrl,
        {},
        {
          params: {
            form_type: VerificationStepEnum.QUESTIONNAIRE,
            verify_as: verificationRole,
            is_company: isCompany,
          },
        }
      )
    },

    sendSms(verifyAs) {
      return instance.post('/user/verification/send/sms', {
        verify_as: verifyAs,
      })
    },

    submit(payload) {
      const ctx = instance.getContext()

      const passportArray = payload.userProfile.passport?.split('-') ?? []

      const data = ctx.$objectToFormData({
        verify_as: payload.verifyAs,
        is_company: payload.isCompany,
        user_profile: {
          name: checkNull(payload.userProfile.name),
          surname: checkNull(payload.userProfile.surname),
          patronymic: checkNull(payload.userProfile.patronymic),
          passport_series: passportArray?.[0] ?? undefined,
          passport_number: passportArray?.[1] ?? undefined,
          nationality: checkNull(payload.userProfile.nationality),
          inn: checkNull(payload.userProfile.inn),
          family_status: checkNull(payload.userProfile.familyStatus),
          snils: checkNull(payload.userProfile.snils),
          is_company: checkNull(payload.userProfile.isCompany),
        },
        images: {
          user_passport: prepareFiles(payload.images.userPassport),
          user_passport_active_subscription: prepareFiles(
            payload.images.userPassportActiveSubscription
          ),
        },
        company_profile: {
          name: checkNull(payload.companyProfile.name),
          inn: checkNull(payload.companyProfile.inn),
          registration_address: checkNull(
            payload.companyProfile.registrationAddress
          ),
          bik: checkNull(payload.companyProfile.bik),
          site: checkNull(payload.companyProfile.site),
          real_address: checkNull(payload.companyProfile.realAddress),
          real_address_equal: checkNull(
            payload.companyProfile.realAddressEqual
          ),
          kpp: checkNull(payload.companyProfile.kpp),
          ogrn: checkNull(payload.companyProfile.ogrn),
          okpo: checkNull(payload.companyProfile.okpo),
          bank: checkNull(payload.companyProfile.bank),
          checking_account: checkNull(payload.companyProfile.checkingAccount),
          corresponding_account: checkNull(
            payload.companyProfile.correspondingAccount
          ),
        },
        questions: {
          finance: prepareQuestion(payload.questions.finance),
          questionnaire: prepareQuestion(payload.questions.questionnaire),
        },
        invest_platform_agreement: payload.investPlatformAgreement,
        operator_and_investor_agreement: payload.operatorAndInvestorAgreement,
        confirm_resident_rf: payload.confirmResidentRf,
        personal_agreement: payload.personalAgreement,
        confirmation_token: payload.confirmationToken,
        _method: 'PATCH',
      })

      return instance.post('/user/verification', data)
    },
  }
}
