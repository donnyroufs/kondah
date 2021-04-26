import { Controller, Get, Middleware } from '@kondah/http-controller'
import { Request, Response } from 'express'
import { isCachedMiddleware } from '../../middlewares/is-cached.middleware'
import { RedditService } from '../../services/reddit.service'

@Controller('/api/reddit')
export class RedditController {
  constructor(private readonly _redditService: RedditService) {}

  @Get('/')
  @Middleware(isCachedMiddleware)
  async index(req: Request, res: Response) {
    const posts = await this._redditService.getAll()

    return res.json({
      data: {
        posts,
      },
    })
  }
}
