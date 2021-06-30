export class MiddlewareFailedException extends Error {
  constructor(name: string) {
    super(`
		the middleware: ${name} returned false and stopped
		the request from going to the route handler.`)
  }
}
