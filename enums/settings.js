export default class SettingsEnum {
  static PLATFORM = 'platform'
  static ACCOUNT = 'account'
  static ACCESS = 'access'

  static getValues() {
    return [
      {
        name: 'Настройки платформы',
        value: SettingsEnum.PLATFORM,
      },
      {
        name: 'Настройки аккаунта',
        value: SettingsEnum.ACCOUNT,
      },
      {
        name: 'Настройки доступа',
        value: SettingsEnum.ACCESS,
      },
    ]
  }

  static getName(value) {
    const list = SettingsEnum.getValues()
    let name = ''

    list.some((setting) => {
      name = setting.name

      return setting.value === value
    })

    return name
  }
}
