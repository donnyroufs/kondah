# Kondah (alpha)

The plug & play micro server framework with full TypeScript support, it's own dependency container,
strong view on making everything testable while not being opinionated.

## Create a new instance and inject plugins

```ts
import { ExpressAdapter } from '@kondah/express-adapter'
import { HttpControllerPlugin } from '@kondah/http-controller'

import { Application } from './app/application'

new Application({
  server: new ExpressAdapter(),
  plugins: [HttpControllerPlugin],
  config: {
    'http-controller': {
      serveRoutes: true,
    },
  },
})
```

## Do some setup work, register services through Energizor

```ts
import { AppContext, Energizor, Kondah } from '@kondah/core'
import { ExpressAdapter } from '@kondah/express-adapter'

import path from 'path'
import handlebars from 'express-handlebars'
import cors from 'cors'

import { RedditService } from './services/reddit.service'

import './controllers/app.controller'
import './api/controllers/reddit.controller'

export class Application extends Kondah {
  protected async configureServices(services: Energizor) {
    services.setDefaultScope('singleton')

    services.register(RedditService)
  }

  protected async setup(ctx: AppContext<ExpressAdapter>) {
    ctx.server.engine('handlebars', handlebars())
    ctx.server.set('views', path.resolve('./apps/milestone-1/src/app/views'))
    ctx.server.set('view engine', 'handlebars')

    ctx.server.use(cors())

    ctx.server.run(5000)
  }
}
```

## Make use of our injected plugin

```ts
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
```

```
> curl http://localhost:5000/api/reddit
> { data: posts: [...] }
```
