import { Energizor, Injectable } from '@kondah/energizor'
import { mock } from 'jest-mock-extended'

import { AbstractHttpAdapter, IEnergizor, IKondahLogger, Kondah } from '../lib'

@Injectable()
class MyService {}

class App extends Kondah<any, any, any> {
  configureServices(services: IEnergizor): void {
    services.addSingleton(MyService)
  }
  setup(services: IEnergizor): void | Promise<void> {}
}

describe('kondah', () => {
  const mockedDriver = mock<AbstractHttpAdapter<any, any, any>>()
  const energizor = mock<Energizor>()
  const mockedLogger = mock<IKondahLogger>()

  let sut: App

  function Constructify() {
    return mockedDriver
  }

  beforeAll(() => {
    sut = new App({
      httpDriver: Constructify as any,
      energizor: energizor,
      logger: mockedLogger,
    })
  })

  test('is defined', () => {
    expect(sut).toBeDefined()
  })

  test('registered my services', async () => {
    await sut.boot()

    expect(energizor.addSingleton).toHaveBeenCalled()
  })

  test('boots the http driver', async () => {
    await sut.boot()

    expect(energizor.addSingleton).toHaveBeenCalled()
  })
})
