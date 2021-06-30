export class MiddlewareTypeIsInvalidException extends Error {
  constructor() {
    super(`
		Middleware can only be a Function or a Class.
		`)
  }
}
