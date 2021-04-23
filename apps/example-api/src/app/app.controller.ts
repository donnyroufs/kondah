import { Controller, Delete, Get, Patch, Post } from '@konda/core'
import { HttpContext } from './application'

@Controller('/app')
export class AppController {
  @Get('/')
  index({ response }: HttpContext) {
    response.json({})
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
