import { Controller, Get } from '@kondah/http-controller'
import { HttpContext } from '@kondah/http-context'
import { AppService } from '../app.service'

@Controller('/')
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get('/')
  async index({ req, res }: HttpContext) {
    return res.send(this._appService.getData())
  }
}
