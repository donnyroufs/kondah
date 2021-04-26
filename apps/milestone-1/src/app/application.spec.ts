import { ExpressAdapter } from '@konda/express-adapter'
import { HttpControllerPlugin } from '@konda/http-controller'
import { Application } from './application'

// const app = createTestApp(app, {
//    runServer: false,
//    plugins: {}
//    adapter: ServerAdapter
// })

describe('application', () => {
  it('should be defined', () => {
    const app = new Application({
      server: new ExpressAdapter(),
      plugins: [HttpControllerPlugin],
      config: {
        'http-controller': {
          serveRoutes: false,
        },
      },
    })

    expect(app).toBeDefined()
  })
})
