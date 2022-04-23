import { mock } from 'jest-mock-extended'

import { Inject } from '../src/decorators/inject.decorator'
import { Injectable } from '../src/decorators/injectable.decorator'
import { CanNotRebindUnknownDependencyException } from '../src/exceptions/can-not-rebind-unknown-dependency.exception'
import { TestableEnergizor } from '../src/test-utils/testable-energizor'
import { ExcludeHooks, ICollection, IEnergizor } from '../src/types'
import { AppCollection } from './mocks/app.collection'
import { CountService } from './mocks/count.service'

describe('testable-energizor', () => {
  test('is defined', () => {
    const ref = new TestableEnergizor()

    expect(ref).toBeDefined()
  })

  describe('rebind()', () => {
    test('rebinds dependency from collection', async () => {
      const mockedCountService = mock<CountService>()
      const ref = new TestableEnergizor([AppCollection])

      await ref.boot()

      ref.rebind(CountService, mockedCountService)

      const resolvedService = ref.get(CountService)

      resolvedService.getCount()

      expect(mockedCountService.getCount).toHaveBeenCalled()
    })

    test('throws CanNotRebindUnknownDependencyException when trying to rebind a service that does not exist', () => {
      const ref = new TestableEnergizor()

      const result = () => ref.rebind(Service, null)

      expect(result).toThrowError(CanNotRebindUnknownDependencyException)
    })

    test('rebinds the service with the mocked service', async () => {
      const ref = new TestableEnergizor()

      const mockObj = mock<Service>()
      ref.addTransient(Service)
      ref.rebind(Service, mockObj)
      mockObj.doSomething.mockReturnValue(false)

      await ref.boot()

      const resolvedService = ref.get(Service)

      expect(resolvedService.doSomething()).toBeFalsy()
    })

    test('rebinds manual mocks with the proper register method', async () => {
      const ref = new TestableEnergizor()

      ref.addTransient(Service)
      ref.rebind(Service, MockedService)

      await ref.boot()

      const resolvedService = ref.get(Service)

      expect(resolvedService).toBeInstanceOf(MockedService)
    })

    test('mocking should work even when registered as singleton', async () => {
      const ref = new TestableEnergizor()

      const mockObj = mock<Service>()
      ref.addTransient(Service)
      ref.rebind(Service, mockObj)
      mockObj.doSomething.mockReturnValue(false)

      await ref.boot()

      const resolvedService = ref.get(Service)

      expect(resolvedService.doSomething()).toBeFalsy()

      mockObj.doSomething.mockReturnValue(true)

      const resolvedService2 = ref.get(Service)

      expect(resolvedService2.doSomething()).toBeTruthy()
    })

    test('should resolve mocked dependencies within another dependency', async () => {
      const ref = new TestableEnergizor()

      ref.addSingleton(Service)
      ref.addSingleton(ServiceWithDependencies)

      const mockObj = mock<Service>()

      ref.rebind(Service, mockObj)

      mockObj.doSomething.mockReturnValue(false)

      await ref.boot()

      const result = ref.get(ServiceWithDependencies)

      expect(result.service.doSomething()).toBeFalsy()
    })

    test('resolves inverted dependencies', async () => {
      const ref = new TestableEnergizor()

      ref.addSingleton<IService>(ServiceToken, Service)
      ref.addSingleton(ServiceWithInvertedDependency)

      const mockObj = mock<Service>()

      ref.rebind(ServiceToken, mockObj)

      mockObj.doSomething.mockReturnValue(false)

      await ref.boot()

      const result = ref.get(ServiceWithInvertedDependency)

      expect(result.service.doSomething()).toBeFalsy()
    })
  })

  test('registers dependencies of a collection', async () => {
    const collection = new TestableEnergizor([Collection])

    await collection.boot()

    const service = collection.get(Service)

    expect(service).toBeInstanceOf(Service)
  })
})

class Collection implements ICollection {
  public configureServices(services: ExcludeHooks<IEnergizor>): void {
    services.addSingleton(Service)
  }
}

@Injectable()
class Service {
  doSomething() {
    return true
  }
}

interface IService {
  doSomething(): boolean
}

const ServiceToken = Symbol('IService')

@Injectable()
class MockedService {}

@Injectable()
class ServiceWithDependencies {
  public constructor(public readonly service: Service) {}
}

@Injectable()
class ServiceWithInvertedDependency {
  public constructor(@Inject(ServiceToken) public readonly service: IService) {}
}
