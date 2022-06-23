export default (context, inject) => {
  inject('priceFormat', (price) => {
    const result =
      price?.toString()?.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') ?? null

    if (result) {
      return result.replace('-', '- ')
    }

    return ''
  })
}
