import { Controller, Get } from '@konda/http-controller'

@Controller('/users')
export class UserController {
  @Get('/')
  index(req, res) {
    res.send('HEYY')
  }
}
