export default ({ $moment }, inject) => {
  inject('dateFormat', (currentDate) => {
    if (currentDate === null) {
      return '_'
    }

    return $moment(currentDate)?.format('DD.MM.YYYY') ?? '_'
  })
}
