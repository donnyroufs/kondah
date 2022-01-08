import { Energizor } from '../src/energizor'
import { BootContainerBeforeUsingException } from '../src/exceptions/boot-container-before-using.exception'

import { MockedLogger } from './mocks/mocked-logger'
import { CountService } from './mocks/count.service'
import { BootableService } from './mocks/bootable.service'
import { AppCollection } from './mocks/app.collection'
import { MailService } from './mocks/mail.service'
import {
  IDatabaseService,
  DatabaseService,
  databaseServiceToken,
} from './mocks/database.service'
import {
  GoogleMeService,
  googleMeServiceToken,
  IGoogleMeService,
} from './mocks/google-me.service'

describe('energizor', () => {
  test('is defined', () => {
    const energizor = new Energizor()

    expect(energizor).toBeDefined()
  })

  test('resolves dependencies', async () => {
    const energizor = new Energizor(new MockedLogger())

    energizor.addTransient(CountService)
    energizor.addTransient(BootableService)
    energizor.addTransient(MailService)

    await energizor.boot()

    const service = energizor.get(MailService)

    expect(service.countService).toBeInstanceOf(CountService)
  })

  test('recursively resolves dependencies', async () => {
    const energizor = new Energizor(new MockedLogger())

    energizor.addTransient(CountService)
    energizor.addTransient(BootableService)
    energizor.addTransient(MailService)

    await energizor.boot()

    const service = energizor.get(MailService)

    expect(service.countService.bootableService).toBeInstanceOf(BootableService)
  })

  test('throws an error when a dependency has not been found in the registry', async () => {
    const energizor = new Energizor(new MockedLogger())

    energizor.addTransient(CountService)
    energizor.addTransient(MailService)

    await energizor.boot()

    const result = () => energizor.get(MailService)

    expect(result).toThrowError()
  })

  describe('boot()', () => {
    test('throws BootContainerBeforeUsingException() when it has not been booted yet.', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(CountService)
      energizor.addTransient(BootableService)
      energizor.addTransient(BootableService)

      const result = () => energizor.get(CountService)

      expect(result).toThrowError(BootContainerBeforeUsingException)
    })

    test('does not throw when energizor has been booted', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(CountService)
      energizor.addTransient(BootableService)

      await energizor.boot()

      const result = energizor.get(CountService)

      expect(result).toBeDefined()
    })

    test('runs onBoot for every dependency', async () => {
      const logger = new MockedLogger()
      const energizor = new Energizor(logger)

      const spy = jest.spyOn(logger, 'info')

      energizor.addTransient(BootableService)

      await energizor.boot()

      expect(spy).toHaveBeenCalledWith('Successfuly booted. (1)')
    })
  })

  describe('addTransient()', () => {
    test('resolves a transient package', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(BootableService)
      energizor.addTransient(CountService)

      await energizor.boot()

      const service = energizor.get(CountService)

      expect(service).toBeDefined()
      expect(service.getCount()).toBe(24)
    })

    test('is always a new instance', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(BootableService)
      energizor.addTransient(CountService)

      await energizor.boot()

      const serviceA = energizor.get(CountService)
      const serviceB = energizor.get(CountService)

      expect(serviceA).toBeDefined()
      expect(serviceA).not.toBe(serviceB)
    })
  })

  describe('addSingleton()', () => {
    test('resolves a singleton package', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(BootableService)
      energizor.addSingleton(CountService)

      await energizor.boot()

      const service = energizor.get(CountService)

      expect(service).toBeDefined()
      expect(service.getCount()).toBe(24)
    })

    test('is always the same instance', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(BootableService)
      energizor.addSingleton(CountService)

      await energizor.boot()

      const service = energizor.get(CountService)

      expect(service.getCount()).toBe(24)
      service.setCount(28)

      const serviceB = energizor.get(CountService)

      expect(serviceB.getCount()).toBe(28)
    })
  })

  describe('addCollection()', () => {
    test('adds a collection and exposes its dependencies', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(BootableService)
      energizor.addCollection(AppCollection)

      await energizor.boot()

      const service = energizor.get(CountService)

      expect(service).toBeDefined()
    })

    test('dependencies of the parent still resolve', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient(BootableService)
      energizor.addCollection(AppCollection)

      await energizor.boot()

      const service = energizor.get(BootableService)

      expect(service).toBeDefined()
    })
  })

  describe('invert dependencies', () => {
    test('resolves an inverted dependency', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient<IDatabaseService>(
        databaseServiceToken,
        DatabaseService
      )
      energizor.addTransient<IGoogleMeService>(
        googleMeServiceToken,
        GoogleMeService
      )

      await energizor.boot()

      const service = energizor.get<IDatabaseService>(databaseServiceToken)

      expect(service).toBeInstanceOf(DatabaseService)
      expect(service.get()).toBe(100)
    })

    test('recursively resolves inverted dependencies', async () => {
      const energizor = new Energizor(new MockedLogger())

      energizor.addTransient<IDatabaseService>(
        databaseServiceToken,
        DatabaseService
      )

      energizor.addTransient<IGoogleMeService>(
        googleMeServiceToken,
        GoogleMeService
      )

      await energizor.boot()

      const service = energizor.get<IDatabaseService>(databaseServiceToken)

      expect(service.googleMeService).toBeInstanceOf(GoogleMeService)
    })
  })
})
