import { Controller, Get } from '@konda/http-controller'
import { NestedService } from './nested.service'

@Controller('/users')
export class UserController {
  constructor(private readonly _service: NestedService) {}
  @Get('/')
  index(req, res) {
    res.send(this._service.nested())
  }
}
