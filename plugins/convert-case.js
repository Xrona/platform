export default (context, inject) => {
  function toCamelCase(string) {
    const arrayString = string.split('_')

    return arrayString
      .map((elem, idx) => {
        if (idx > 0) {
          return elem[0].toUpperCase() + elem.slice(1)
        }

        return elem
      })
      .join('')
  }

  function toSnakeCase(string) {
    const snake = string.replace(/([A-Z])/g, '_$1')

    return snake.toLowerCase()
  }

  function phone(string) {
    if (string) {
      return `+${string.match(/([0-9])/g).join('')}`
    }

    return ''
  }

  inject('case', {
    toCamelCase,
    toSnakeCase,
    phone,
  })
}
