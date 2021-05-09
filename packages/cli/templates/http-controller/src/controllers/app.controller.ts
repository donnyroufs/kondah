import { HttpContext } from '@kondah/http-context'
import { Controller, Get } from '@kondah/http-controller'

@Controller()
export class AppController {
  @Get('/')
  index(httpContext: HttpContext) {
    httpContext.res.send('hello from kondah!')
  }
}
