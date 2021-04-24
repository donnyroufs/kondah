export function logMiddleware(req, res, next) {
  console.log('-----------------------HEY I AM LOGGING YO')
  next()
}
