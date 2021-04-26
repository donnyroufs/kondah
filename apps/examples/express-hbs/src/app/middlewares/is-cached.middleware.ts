import { NextFunction, Request, Response } from 'express'
import { app } from '../../main'
import { RedditService } from '../services/reddit.service'

// functionality is within the service
// Just showing that middleware can get access to the service!
export async function isCachedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const service = app.getContext().energizor.get(RedditService)

  const usingCache = !!service.shouldUseCacheInstead()

  console.log({ usingCache })

  next()
}
