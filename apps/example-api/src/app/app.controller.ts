import {
  Controller,
  Delete,
  Get,
  Middleware,
  Patch,
  Post,
} from '@konda/http-controller'
import { logMiddleware } from './log.middleware'
import { UserService } from './user.service'

@Controller('/app')
export class AppController {
  constructor(private readonly _userService: UserService) {}

  @Get('/')
  @Middleware([logMiddleware])
  index(_, response) {
    response.json(this._userService.getUsers())
  }

  @Post('/')
  create(request, response) {
    response.json(request.body)
  }

  @Get('/:id')
  show(_, response) {
    response.send('show')
  }

  @Patch('/:id')
  update(request, response) {
    const { id } = request.params
    response.send(id)
  }

  @Delete('/:id')
  destroy(request, response) {
    const { id } = request.params
    response.send(id)
  }
}
