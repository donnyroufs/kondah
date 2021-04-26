import { Controller, Get, Middleware } from '@konda/http-controller'
import { Request, Response } from 'express'
import { isCachedMiddleware } from '../middlewares/is-cached.middleware'
import { RedditService } from '../services/reddit.service'

@Controller('/')
export class AppController {
  constructor(private readonly _redditService: RedditService) {}

  @Get('/')
  @Middleware(isCachedMiddleware)
  async index(req: Request, res: Response) {
    const posts = await this._redditService.getAll()

    return res.render('index', {
      layout: false,
      state: {
        posts,
      },
    })
  }
}
