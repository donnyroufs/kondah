import { Controller, Get } from '@kondah/http-controller'
import { AppService } from './app.service'

@Controller('/app')
export class AppController {
  constructor(private readonly _appService: AppService) {}
  @Get('/')
  // @ts-expect-error we dont have express types right now; but we will be getting a httpcontext soon!
  async index(req, res) {
    return res.send(this._appService.getData())
  }
}
