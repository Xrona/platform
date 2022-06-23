import { serialize } from 'object-to-formdata'

export default (context, inject) => {
  inject('objectToFormData', (object) => {
    window.objectToFormData = serialize

    return serialize(object, {
      indices: true,
      nullsAsUndefineds: false,
      booleansAsIntegers: true,
      allowEmptyArrays: false,
      noFilesWithArrayNotation: false,
      dotsForObjectNotation: false,
    })
  })
}
