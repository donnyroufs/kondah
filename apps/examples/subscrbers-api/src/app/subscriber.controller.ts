import { Controller, Delete, Get, Patch, Post } from '@kondah/http-controller'
import { SubscriberService } from './subscriber.service'
import { Request, Response } from 'express'

@Controller('/subscribers')
export class SubscriberController {
  constructor(private readonly _subscriberService: SubscriberService) {}

  @Get('/')
  async index(_: any, res: Response) {
    const subscribers = await this._subscriberService.getAllSubscribers()

    res.json({
      data: {
        subscribers,
      },
    })
  }

  @Get('/:id')
  async show(req: Request, res: Response) {
    const subscriber = await this._subscriberService.getOneSubscriber(
      req.params.id
    )

    res.json({
      data: {
        subscriber,
      },
    })
  }

  @Post('/')
  async store(req: Request, res: Response) {
    const subscriber = await this._subscriberService.createSubscriber(req.body)

    res.json({
      data: {
        subscriber,
      },
    })
  }

  @Patch('/:id')
  async update(req: Request, res: Response) {
    await this._subscriberService.updateSubscriber(req.body)

    res.sendStatus(204)
  }

  @Delete('/:id')
  async destroy(req: Request, res: Response) {
    await this._subscriberService.deleteSubscriber(req.params.id)

    res.sendStatus(204)
  }
}
