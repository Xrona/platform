export default class VerificationStepEnum {
  static PERSONAL = 'personal'
  static COMPANY = 'company'
  static FINANCE = 'finance'
  static QUESTIONNAIRE = 'questionnaire'

  static getSteps() {
    return [
      VerificationStepEnum.PERSONAL,
      VerificationStepEnum.COMPANY,
      VerificationStepEnum.FINANCE,
      VerificationStepEnum.QUESTIONNAIRE,
    ]
  }

  static getStep(step) {
    const arraySteps = VerificationStepEnum.getSteps()

    return arraySteps?.[step] ?? null
  }
}
