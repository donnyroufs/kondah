import { Energizor, IEnergizor } from '@kondah/energizor'
import { AsyncLocalStorage } from 'async_hooks'
import { mock } from 'jest-mock-extended'

import {
  HttpMethod,
  HttpStatusCode,
  IHttpDriver,
  REST,
  IHttpContext,
} from '../../src/http'
import { RouteData } from '../../src/http/route-data'

describe('rest', () => {
  let asyncLocalStorage: AsyncLocalStorage<IHttpContext>
  let httpDriver: IHttpDriver
  let energizor: IEnergizor

  beforeAll(() => {
    asyncLocalStorage = new AsyncLocalStorage<IHttpContext>()
    httpDriver = mock<IHttpDriver>()
    energizor = new Energizor()

    REST.controllers = []
  })

  function makeREST(controllers: RouteData[] = []) {
    const rest = new REST(asyncLocalStorage, httpDriver, energizor)
    REST.controllers = controllers

    return rest
  }

  test('adds routes', () => {
    class MockedController {}
    const routeData = new RouteData(
      '/app',
      HttpMethod.GET,
      undefined,
      new MockedController() as any,
      'id',
      HttpStatusCode.OK,
      MockedController,
      []
    )

    const rest = makeREST([routeData])
    rest.onBoot()

    expect(httpDriver.addRoute).toHaveBeenCalledTimes(1)
  })
})
