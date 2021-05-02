export function Exception(message = '') {
  return class Exception extends Error {
    constructor() {
      super()
      this.message = message
    }
  }
}
