import { ExpressHttpAdapter } from '../src/express-http.adapter'
import { mock } from 'jest-mock-extended'
import { IEnergizor, IKondahLogger, Kondah } from '@kondah/core'
import { Server } from 'http'

class App extends Kondah<
  Express.Request,
  Express.Response,
  Express.Application
> {
  configureServices(services: IEnergizor): void {}
  async setup(services: IEnergizor): Promise<void> {
    await this.getHttpDriver().run(9999)
  }
  getServerInstance() {
    return this.getHttpDriver().getServer()
  }
}

describe('express.adapter', () => {
  test('is defined', () => {
    const energizorMock = mock<IEnergizor>()
    const adapter = new ExpressHttpAdapter(energizorMock)

    expect(adapter).toBeDefined()
  })

  test('initializes kondah', () => {
    const app = new App({
      httpDriver: ExpressHttpAdapter,
    })

    expect(app).toBeDefined()
  })

  test('server instance is available after boot', async () => {
    const mockedLogger = mock<IKondahLogger>()

    const app = new App({
      httpDriver: ExpressHttpAdapter,
      logger: mockedLogger,
    })

    await app.boot()

    expect(app.getServerInstance()).toBeInstanceOf(Server)

    app.getServerInstance().close()
  })
})
