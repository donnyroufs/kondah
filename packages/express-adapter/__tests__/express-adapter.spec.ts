import { ExpressHttpAdapter } from '../src/express-http.adapter'
import { mock } from 'jest-mock-extended'
import { IEnergizor, Kondah } from '@kondah/core'

class App extends Kondah<
  Express.Request,
  Express.Response,
  Express.Application
> {
  configureServices(services: IEnergizor): void {}
  setup(services: IEnergizor): void | Promise<void> {}
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
})
