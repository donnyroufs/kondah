import { Controller, Delete, Get, Middleware, Patch, Post } from '@konda/core'
import { HttpContext } from './application'
import { logMiddleware } from './log.middleware'
import { UserService } from './user.service'

@Controller('/app')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Middleware([logMiddleware])
  index({ response }: HttpContext) {
    response.json(this.userService.getUsers())
  }

  @Post('/')
  create({ request, response }: HttpContext) {
    response.json(request.body)
  }

  @Get('/:id')
  show({ response }: HttpContext) {
    response.send('show')
  }

  @Patch('/:id')
  update({ request, response }: HttpContext) {
    const { id } = request.params
    response.send(id)
  }

  @Delete('/:id')
  destroy({ request, response }: HttpContext) {
    const { id } = request.params
    response.send(id)
  }
}
