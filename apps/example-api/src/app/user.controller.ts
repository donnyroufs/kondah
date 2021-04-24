import { Controller, Get } from '@konda/core'

@Controller('/users')
export class UserController {
  @Get('/')
  index(req, res) {
    res.send('HEYY')
  }
}
